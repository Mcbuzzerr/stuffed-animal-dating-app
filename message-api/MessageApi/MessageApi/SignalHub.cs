using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace MessageApi
{
    public class SignalHub : Hub
    {
        public async Task SendMessage(Message message)
        {
            // Get the group name for the sender and recipient
            var groupName = GetMatchGroupName(message.Sender, message.Recipient);

            // Broadcast the received message to the group (sender and recipient)
            await Clients.Group(groupName).SendAsync("ReceiveMessage", message); // Use "ReceiveMessage" as the event name
        }

        private string GetMatchGroupName(string sender, string recipient)
        {
            // Generate a unique group name based on sender and recipient IDs
            return $"{sender}_{recipient}";
        }

        public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }
    }
}
