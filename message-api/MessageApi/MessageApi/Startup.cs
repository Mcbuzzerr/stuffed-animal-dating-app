using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using MongoDB.Driver;
using System;

namespace MessageApi
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Message API", Version = "v1" });
            });

            // Register MongoDB dependencies
            services.AddSingleton<IMongoDatabase>(provider =>
            {
                var mongoClient = new MongoClient("mongodb://localhost:27018");
                return mongoClient.GetDatabase("MessageDB");
            });

            // Register your services
            services.AddScoped<MessagingController>();
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

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapGet("/", async context =>
                {
                    // Redirect root URL to Swagger UI
                    context.Response.Redirect("/swagger");
                });
            });
        }
    }
}
