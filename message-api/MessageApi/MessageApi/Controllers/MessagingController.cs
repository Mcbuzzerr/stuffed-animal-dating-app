using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;

namespace MessageApi
{
    [ApiController]
    [Route("api")]
    public class MessagingController : ControllerBase
    {
        private readonly IMongoCollection<Match> matchesCollection;
        private readonly IMongoCollection<Message> messagesCollection;

        private readonly IHubContext<SignalHub> _hubContext;

        public MessagingController(IMongoDatabase database, IHubContext<SignalHub> hubContext)
        {
            matchesCollection = database.GetCollection<Match>("matches");
            messagesCollection = database.GetCollection<Message>("messages");
            _hubContext = hubContext;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendMessage([FromBody] Message message)
        {
            // Perform validation if needed

            if (string.IsNullOrEmpty(message.TimeSent))
            {
                // Set the TimeSent field only if it is null or empty
                message.TimeSent = DateTime.Now.ToString();
            }

            var matchFilter = Builders<Match>.Filter.Where(m =>
                ((m.First == message.Sender && m.Second == message.Recipient) ||
                (m.First == message.Recipient && m.Second == message.Sender)) &&
                !m.Deleted);

            var match = matchesCollection.Find(matchFilter).FirstOrDefault();

            if (match == null)
            {
                return NotFound("Match not found or deleted. Cannot send message.");
            }

            messagesCollection.InsertOne(message);

            // Get the group name for the sender and recipient
            var groupName = GetMatchGroupName(message.Sender, message.Recipient);

            // Broadcast the message asynchronously to the group
            await _hubContext.Clients.Group(groupName).SendAsync("ReceiveMessage", message);

            return StatusCode(201);
        }


        private string GetMatchGroupName(string sender, string recipient)
        {
            // Generate a unique group name based on sender and recipient IDs
            List<string> groupMembers = new List<string> { sender, recipient };
            groupMembers.Sort(); // Sort the member names to ensure consistency
            return string.Join("_", groupMembers);
        }

        [HttpPost("match")]
        public IActionResult CreateMatch([FromBody] Match match)
        {
            // Perform validation if needed

            matchesCollection.InsertOne(match);

            // Send two messages
            var firstMessage = new Message
            {
                Sender = match.First,
                Recipient = match.Second,
                Text = match.FirstMsg,
                TimeSent = DateTime.Now.ToString()
            };
            messagesCollection.InsertOne(firstMessage);

            var secondMessage = new Message
            {
                Sender = match.Second,
                Recipient = match.First,
                Text = match.SecondMsg,
                TimeSent = DateTime.Now.ToString()
            };
            messagesCollection.InsertOne(secondMessage);

            return StatusCode(201);
        }

        [HttpPatch("unmatch")]
        public IActionResult RemoveMatch([FromBody] Match match)
        {
            var filter = Builders<Match>.Filter.Eq("_id", match.Id);
            var update = Builders<Match>.Update.Set(m => m.Deleted, true);
            matchesCollection.UpdateOne(filter, update);

            return StatusCode(204);
        }

        [HttpGet("retrieve")]
        public IActionResult RetrieveMessages(string sender, string receiver)
        {
            var matchFilter = Builders<Match>.Filter.Where(m => (m.First == sender && m.Second == receiver) || (m.First == receiver && m.Second == sender));
            var match = matchesCollection.Find(matchFilter).FirstOrDefault();

            if (match == null || match.Deleted)
            {
                return NotFound("Match not found or deleted.");
            }

            var messageFilter = Builders<Message>.Filter.Where(m => (m.Sender == sender && m.Recipient == receiver) || (m.Sender == receiver && m.Recipient == sender));
            var messages = messagesCollection.Find(messageFilter).SortByDescending(m => m.TimeSent).Project<Message>(Builders<Message>.Projection.Exclude("_id")).ToList();

            if (messages.Count == 0)
            {
                return NotFound("No messages found.");
            }

            return Ok(new { Messages = messages });
        }


    }

    public class Match
    {
        public ObjectId Id { get; set; }
        public string First { get; set; }
        public string FirstMsg { get; set; }
        public string Second { get; set; }
        public string SecondMsg { get; set; }
        public bool Deleted { get; set; }
    }
    public class Message
    {
        public ObjectId Id { get; set; }
        public string Sender { get; set; }
        public string Recipient { get; set; }
        public string Text { get; set; }
        public string? TimeSent { get; set; }
    }
}