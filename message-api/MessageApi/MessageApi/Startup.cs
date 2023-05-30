using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;
using MongoDB.Driver;
using Steeltoe.Discovery.Client;
using Steeltoe.Discovery.Eureka;
using System;

namespace MessageApi
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins("ocelot-gateway:5041")
                           .AllowAnyMethod()
                           .AllowAnyHeader()
                           .AllowCredentials();
                });
            });

            services.AddControllers();

            services.AddDiscoveryClient(_configuration);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Message API", Version = "v1" });
            });

            // Register MongoDB dependencies
            services.AddSingleton<IMongoDatabase>(provider =>
            {
                var mongoClient = new MongoClient("mongodb://root:pass@localhost:27018/?authMechanism=SCRAM-SHA-256");
                return mongoClient.GetDatabase("MessageDB");
            });

            // Register your services
            services.AddScoped<MessagingController>();
            services.AddSignalR();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Enable Swagger UI
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Message API v1");
                c.RoutePrefix = string.Empty; // Set the root URL for Swagger UI
            });

            app.UseRouting();
            app.UseDiscoveryClient();
            app.UseCors();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<SignalHub>("/myhub"); // Hub endpoint path
                endpoints.MapGet("/", async context =>
                {
                    // Redirect root URL to Swagger UI
                    context.Response.Redirect("/swagger");
                });
            });
        }
    }
}
