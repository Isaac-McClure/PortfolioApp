using PortfolioApp.Server.Mapper;
using PortfolioApp.Server.Models;
using PortfolioApp.Server.Repositories;
using PortfolioApp.Server.Repositories.Interfaces;
using Serilog;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddScoped<IDisplayRepository, DisplayRepository>();
builder.Services.AddScoped<DatabaseSettings, DatabaseSettings>();
builder.Services.AddAutoMapper(typeof(DisplayProfile));

// Add logging with Serilog
builder.Host.UseSerilog((context, configuration) =>
    configuration.ReadFrom.Configuration(context.Configuration));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options => options.AddPolicy("ApiCorsPolicy", policy => {
    policy.WithOrigins("http://localhost:5173").AllowAnyMethod().AllowAnyHeader();
    }));

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseSerilogRequestLogging();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("ApiCorsPolicy"); // UseCors must be called before UseAuthorization
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
