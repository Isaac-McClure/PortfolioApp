namespace PortfolioApp.Server.Models
{
    public class Display
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string ImageUrl { get; set; }
        public bool HasDownloadableCode { get; set; }
        public string? CodeFilePath { get; set; }
        public bool HasDownloadableExecutable { get; set; }
        public string? ExecutableFilePath { get; set; }

    }
}
