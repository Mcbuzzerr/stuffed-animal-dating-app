using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using System;
using System.Collections.Generic;

namespace MessageApi
{
    // Rest of the code...

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

            // Resolve IMongoDatabase and pass it to MessagingController
            using (var scope = app.Services.CreateScope())
            {
                var serviceProvider = scope.ServiceProvider;
                var database = serviceProvider.GetRequiredService<IMongoDatabase>();

                // Pass the IMongoDatabase instance to the constructor of MessagingController
                var messagingController = new MessagingController(database);

                // Add the MessagingController instance to the routing pipeline
                app.MapControllers().WithEndpoint(endpoint => endpoint.Metadata.Add(messagingController));
            }

            app.Run();
        }
    }
}
