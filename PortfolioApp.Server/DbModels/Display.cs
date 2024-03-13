using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace PortfolioApp.Server.DbModels
{
    public class Display: IFindable
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? _id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string DetailDescription { get; set; }
        public required string ImageUrl { get; set; }
        public string? GitHubLink { get; set; }
        public string? ProductionLink { get; set; }
    }
}
