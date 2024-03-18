using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
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
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddAutoMapper(typeof(DisplayProfile));

// Add logging with Serilog
builder.Host.UseSerilog((context, configuration) =>
    configuration.ReadFrom.Configuration(context.Configuration));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options => options.AddPolicy("ApiCorsPolicy", policy => {
    policy.WithOrigins("https://" + Environment.GetEnvironmentVariable("CORS_HOST")).AllowAnyMethod().AllowAnyHeader().AllowCredentials();
    }));

// Add auth
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options => {
        options.LoginPath = "/Login/Login"; // Specify the login page URL
        options.ExpireTimeSpan = TimeSpan.FromMinutes(20);
        options.SlidingExpiration = true;
        options.Cookie.HttpOnly = true;
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        options.Cookie.SameSite = SameSiteMode.None;
    });

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

app.UseHsts();

app.UseCors("ApiCorsPolicy"); // UseCors must be called before UseAuthorization
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
