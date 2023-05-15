using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
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

        public MessagingController(IMongoDatabase database)
        {
            matchesCollection = database.GetCollection<Match>("matches");
            messagesCollection = database.GetCollection<Message>("messages");
        }

        [HttpPost("send")]
        public IActionResult SendMessage([FromBody] Message message)
        {
            // Perform validation if needed

            message.TimeSent = DateTime.UtcNow.ToString(); // Set the TimeSent to the current UTC time

            messagesCollection.InsertOne(message);

            return StatusCode(201);
        }


        [HttpPost("match")]
        public IActionResult CreateMatch([FromBody] Match match)
        {
            // Perform validation if needed

            matchesCollection.InsertOne(match);

            return StatusCode(201);
        }

        [HttpDelete("unmatch/{sender}/{receiver}")]
        public IActionResult RemoveMatch(string sender, string receiver)
        {
            var filter = Builders<Match>.Filter.Where(m => (m.First == sender && m.Second == receiver) || (m.First == receiver && m.Second == sender));

            matchesCollection.DeleteOne(filter);

            return StatusCode(204);
        }

        [HttpGet("retrieve/{sender}/{receiver}")]
        public IActionResult RetrieveMessages(string sender, string receiver)
        {
            var filter = Builders<Message>.Filter.Where(m => (m.Sender == sender && m.Recipient == receiver) || (m.Sender == receiver && m.Recipient == sender));

            List<string> retrievedMessages = messagesCollection.Find(filter).ToList().ConvertAll(m => m.Text);

            return Ok(new { Messages = retrievedMessages });
        }
    }

    public class Match
    {
        public string First { get; set; }
        public string FirstMsg { get; set; }
        public string Second { get; set; }
        public string SecondMsg { get; set; }
    }

    public class Message
    {
        public string Sender { get; set; }
        public string Recipient { get; set; }
        public string Text { get; set; }
        public string TimeSent { get; set; }
    }

    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Configure MongoDB connection
            var connectionString = "mongodb://localhost:27018"; // Replace with your MongoDB connection string
            builder.Services.AddSingleton<IMongoClient>(new MongoClient(connectionString));
            builder.Services.AddScoped<IMongoDatabase>(provider =>
            {
                var client = provider.GetService<IMongoClient>();
                var databaseName = "YourDatabaseName"; // Replace with your MongoDB database name
                return client.GetDatabase(databaseName);
            });

            var app = builder.Build();
            var env = app.Environment;

            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
