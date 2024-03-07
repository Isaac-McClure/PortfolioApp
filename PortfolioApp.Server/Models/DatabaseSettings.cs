namespace PortfolioApp.Server.Models
{
    public class DatabaseSettings
    {
        public string ConnectionString { get; set; } = "mongodb://portfolioapp-database:27017";

        public string DatabaseName { get; set; } = Environment.GetEnvironmentVariable("DATABASE_NAME");

        public string DisplayCollectionName { get; set; } = "displays";
    }
}