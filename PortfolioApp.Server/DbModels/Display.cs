using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace PortfolioApp.Server.DbModels
{
    public class Display
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string DetailDescription { get; set; }
        public required string ImageUrl { get; set; }
        public bool HasDownloadableCode { get; set; }
        public string? CodeFilePath { get; set; }
        public bool HasDownloadableExecutable { get; set; }
        public string? ExecutableFilePath { get; set; }
    }
}
