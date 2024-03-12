using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PortfolioApp.Server.DbModels;
using PortfolioApp.Server.Models.Auth;
using PortfolioApp.Server.Repositories.Interfaces;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;

namespace PortfolioApp.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;
        IUserRepository _userRepository;
        IUserTokenRepository _userTokenRepository;

        private static string ADMIN_ROLE = "Administrator";

        public LoginController(ILogger<LoginController> logger, IUserRepository userRepository, IUserTokenRepository userTokenRepository)
        {
            _logger = logger;
            _userRepository = userRepository;
            _userTokenRepository = userTokenRepository;
        }

        [HttpPost]
        [Route("login")]
        // Ref https://learn.microsoft.com/en-us/aspnet/core/security/authentication/cookie?view=aspnetcore-8.0#add-cookie-authentication
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            // Get user by username
            var user = await _userRepository.GetByUsernameAsync(loginDto.Username);
            if (user is null)
            {
                return BadRequest();
            }

            // Verify given password is same
            var passwordHasher = new PasswordHasher<User>();
            var passwordVerficiationResult = passwordHasher.VerifyHashedPassword(user, user.Password, loginDto.Password);

            if (passwordVerficiationResult == PasswordVerificationResult.Failed) 
            {
                return BadRequest();
            }
            // May not need.
            //// Create new token
            //var newToken = new UserToken()
            //{
            //    UserId = user._id,
            //    Token = Guid.NewGuid().ToString(),
            //    ValidTill = DateTime.Now.AddHours(2)
            //};
            //
            //// Store the token in the database 
            //await _userTokenRepository.CreateAsync(newToken);
            //
            ////response.Headers.AddCookies(loginCookieBuilder.Build());

            // Set the user claims
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, ADMIN_ROLE),
            };

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            // Options
            var authProperties = new AuthenticationProperties
            {
                //AllowRefresh = <bool>,
                // Refreshing the authentication session should be allowed.

                //ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(10),
                // The time at which the authentication ticket expires. A 
                // value set here overrides the ExpireTimeSpan option of 
                // CookieAuthenticationOptions set with AddCookie.

                //IsPersistent = true,
                // Whether the authentication session is persisted across 
                // multiple requests. When used with cookies, controls
                // whether the cookie's lifetime is absolute (matching the
                // lifetime of the authentication ticket) or session-based.

                //IssuedUtc = <DateTimeOffset>,
                // The time at which the authentication ticket was issued.

                //RedirectUri = <string>
                // The full path or absolute URI to be used as an http 
                // redirect response value.
            };

            // SignInAsync creates an encrypted cookie and adds it to the current response.
            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);


            _logger.LogInformation("User {Username} logged in at {Time}.",
                user.Username, DateTime.UtcNow);

            return Ok();
        }

        [HttpPost]
        [Route("logout")]
        public async Task Logout()
        {
            // Clear the existing external cookie
            await HttpContext.SignOutAsync(
                CookieAuthenticationDefaults.AuthenticationScheme);
        }

        [HttpGet]
        [Route("isAdmin")]
        [Authorize(Roles = "Administrator")]
        public ActionResult IsAdmin()
        {
            return Ok();
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto) 
        {
            if (!ModelState.IsValid) 
            {
                return BadRequest();
            }
            
            // There can only be one user
            var users = await _userRepository.GetAllAsync();
            if (users.Any()) 
            {
                return BadRequest();
            }

            var newUser = new User()
            {
                Username = registerDto.Username
            };

            // plaintext passwords should not be stored.
            var passwordHasher = new PasswordHasher<User>();
            var hashedPassword = passwordHasher.HashPassword(newUser, registerDto.Password);
            newUser.Password = hashedPassword;

            await _userRepository.CreateAsync(newUser);

            return Ok();
        }
    }
}