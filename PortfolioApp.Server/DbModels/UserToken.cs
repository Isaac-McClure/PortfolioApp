using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace PortfolioApp.Server.DbModels
{
    public class UserToken : IFindable
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? _id { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public required string UserId { get; set; }
        public required string Token { get; set; }
        public required DateTime ValidTill { get; set; }
    }
}
