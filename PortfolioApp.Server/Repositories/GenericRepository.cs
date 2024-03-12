using MongoDB.Bson;
using MongoDB.Driver;
using PortfolioApp.Server.DbModels;
using PortfolioApp.Server.Models;
using PortfolioApp.Server.Repositories.Interfaces;

namespace PortfolioApp.Server.Repositories
{
    public abstract class GenericRepository<T>: IRepository<T> where T : class, IFindable
    {
        protected readonly IMongoCollection<T> _collection;

        public GenericRepository(DatabaseSettings databaseSettings)
        {
            var mongoClient = new MongoClient(databaseSettings.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(databaseSettings.DatabaseName);

            _collection = mongoDatabase.GetCollection<T>(string.Concat(typeof(T).Name, "s"));
        }
        public async Task<T> CreateAsync(T entity)
        {
            await _collection.InsertOneAsync(entity);
            return entity;
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            var entities = await _collection.Find(_ => true).ToListAsync();

            return entities;
        }
        public async Task<T> GetByIdAsync(string id)
        {
            // Check if ID is valid objectId, and convert it to one.
            bool isValid = ObjectId.TryParse(id, out ObjectId objectId);
            if (!isValid)
            {
                throw new ArgumentException($"Given ID \"{id}\" was not a valid Object Id");
            }

            var display = await _collection.Find(x => x._id.Equals(objectId.ToString())).FirstOrDefaultAsync();

            if (display == null)
            {
                throw new ArgumentException("No display found for that Id");
            }

            return display;
        }
    }
}
