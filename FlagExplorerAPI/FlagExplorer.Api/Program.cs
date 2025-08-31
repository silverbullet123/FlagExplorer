using FlagExplorer.Application.Interfaces;
using FlagExplorer.Infrastructure.Services;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.AspNetCore.SwaggerUI;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register our custom services
builder.Services.AddScoped<IRestCountriesService, RestCountriesService>();
builder.Services.AddHttpClient("RestCountries", client =>
{
    client.BaseAddress = new Uri("https://restcountries.com/");
});

// Add CORS policy to allow requests from the frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("http://localhost:53067") 
                       .AllowAnyHeader()
                       .AllowAnyMethod());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend"); // Apply the CORS policy

app.UseAuthorization();

app.MapControllers();

app.Run();



// Needed for WebApplicationFactory
public partial class Program { }