namespace PortfolioApp.Server.Models
{
    public class DisplayDto
    {
        public required string Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string DetailDescription { get; set; }
        public required string ImageUrl { get; set; }
        public string? GitHubLink { get; set; }
    }
}
