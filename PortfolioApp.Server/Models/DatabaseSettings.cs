namespace PortfolioApp.Server.Models
{
    public class DatabaseSettings
    {

        public string DatabaseName { get; } = Environment.GetEnvironmentVariable("DATABASE_NAME");

        public string DisplayCollectionName { get; } = "displays";
        public string DatabaseUser { get; } = Environment.GetEnvironmentVariable("DATABASE_USER");
        public string DatabasePassword { get; } = Environment.GetEnvironmentVariable("DATABASE_PASSWORD");
        public string ConnectionString { get; private set; }
        public DatabaseSettings() 
        {
            this.ConnectionString = $"mongodb://{this.DatabaseUser}:{this.DatabasePassword}@portfolioapp-database:27017/?authSource={DatabaseName}";
        }
    }
}