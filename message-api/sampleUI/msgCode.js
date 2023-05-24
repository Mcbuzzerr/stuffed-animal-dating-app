$(document).ready(function () {
  const apiUrl = 'https://localhost:55155/api';

  function sendMessage(sender, recipient, text) {
    const message = {
      Sender: sender,
      Recipient: recipient,
      Text: text
    };

    $.ajax({
      url: `${apiUrl}/send`,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(message),
      success: function () {
        console.log('Message sent:', message);
      },
      error: function (error) {
        console.error('Error sending message:', error);
      }
    });
  }

  function retrieveMessages(sender, recipient) {
    $.ajax({
      url: `${apiUrl}/retrieve?sender=${sender}&receiver=${recipient}`,
      type: 'GET',
      success: function (data) {
        console.log('Retrieved data:', data);

        if (Array.isArray(data.messages)) {
          data.messages.sort(function (a, b) {
            // Convert timeSent strings to Date objects for comparison
            const timeSentA = new Date(a.timeSent);
            const timeSentB = new Date(b.timeSent);
            return timeSentA - timeSentB;
          });

          // Clear existing messages in the conversation container
          $('#conversation-messages').empty();

          data.messages.forEach(function (message) {
            if (message.sender === sender && message.recipient === recipient) {
              $(`#${recipient}-messages`).append('<div><strong>' + message.sender + ':</strong> ' + message.text + '</div>');
            } else if (message.sender === recipient && message.recipient === sender) {
              $(`#${sender}-messages`).append('<div><strong>' + message.sender + ':</strong> ' + message.text + '</div>');
            }
            // Append messages to the conversation container
            $('#conversation-messages').append('<div><strong>' + message.sender + ':</strong> ' + message.text + '</div>');
          });
        }

        // Scroll to the bottom of the message container
        const containerId = (sender === user1) ? 'user1-messages' : 'user2-messages';
        const container = document.getElementById(containerId);
        container.scrollTop = container.scrollHeight;
      },
      error: function (error) {
        console.error('Error retrieving messages:', error);
      }
    });
  }



  // Example usage
  const user1 = 'user1';
  const user2 = 'user2';

  $('#user1-send-btn').on('click', function () {
    const text = $('#user1-input').val();
    sendMessage(user1, user2, text);
    $('#user1-input').val('');
  });

  $('#user2-send-btn').on('click', function () {
    const text = $('#user2-input').val();
    sendMessage(user2, user1, text);
    $('#user2-input').val('');
  });

  // Retrieve messages initially
  retrieveMessages(user1, user2);
  retrieveMessages(user2, user1);

  // Set up SignalR connection
  const connection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:55155/myhub') // Use your HUB URL here
    .build();

  connection.start().then(function () {
    console.log('SignalR connection established.');

    // Add the user to the group based on the user's ID
    const groupName = 'user1_user2'; // Change this to the appropriate group name
    connection.invoke('AddToGroup', groupName).then(function () {
      console.log('Added to group:', groupName);
    }).catch(function (error) {
      console.error('Error adding to group:', error);
    });

    // Receive message event handler
    connection.on('ReceiveMessage', function (message) {
      console.log('Received message:', message);

      const sender = (message.sender === user2) ? user1 : user2;
      const recipient = (message.sender === user1) ? user2 : user1;

      const senderTextboxId = `#${sender}-input`;
      const recipientTextboxId = `#${recipient}-input`;

      const senderContainerId = (message.sender === user1) ? 'user1-messages' : 'user2-messages';
      const recipientContainerId = (message.sender === user1) ? 'user2-messages' : 'user1-messages';

      // Append the new message at the bottom of sender's container
      $('#' + senderContainerId).append('<div><strong>' + sender + ':</strong> ' + message.text + '</div>');

      // Append the new message at the bottom of the conversation container
      $('#conversation-messages').append('<div><strong>' + sender + ':</strong> ' + message.text + '</div>');

      // Check if the receiving user's textbox is focused
      if ($(recipientTextboxId).is(':focus')) {
        // Scroll to the bottom of the recipient's container
        const recipientContainer = document.getElementById(recipientContainerId);
        recipientContainer.scrollTop = recipientContainer.scrollHeight;
      } else {
        // Display a notification or indicator to indicate new messages
        $(recipientTextboxId).addClass('new-messages-indicator');
      }

      // Scroll to the bottom of the sender's container
      const senderContainer = document.getElementById(senderContainerId);
      senderContainer.scrollTop = senderContainer.scrollHeight;

      // Scroll to the bottom of the conversation container
      const conversationContainer = document.getElementById('conversation-messages');
      conversationContainer.scrollTop = conversationContainer.scrollHeight;

      // Additional logs to verify if the message is received
      console.log('Message received:', message);
      console.log('Sender:', sender);
      console.log('Recipient:', recipient);
    });

  }).catch(function (error) {
    console.error('Error establishing SignalR connection:', error);
  });
});
