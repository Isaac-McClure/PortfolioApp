using System.ComponentModel.DataAnnotations;

namespace PortfolioApp.Server.Models.Auth
{
    public class RegisterDto
    {
        [Required]
        [MinLength(3)]
        public required string Username { get; set; }
        [Required]
        [MinLength(10)]
        public required string Password { get; set; }
    }
}
