using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace PortfolioApp.Server.DbModels
{
    public interface IFindable
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? _id { get; set; }
    }
}
