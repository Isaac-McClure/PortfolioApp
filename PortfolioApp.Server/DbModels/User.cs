using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace PortfolioApp.Server.DbModels
{
    public class User: IFindable
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? _id { get; set; }
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}
