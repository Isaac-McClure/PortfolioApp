using MongoDB.Driver;
using PortfolioApp.Server.DbModels;
using PortfolioApp.Server.Repositories.Interfaces;
using PortfolioApp.Server.Models;
using MongoDB.Bson;
using static MongoDB.Driver.WriteConcern;

namespace PortfolioApp.Server.Repositories
{
	public class DisplayRepository : IDisplayRepository
    {

        private readonly IMongoCollection<Display> _displayCollection;

		public DisplayRepository(DatabaseSettings databaseSettings) 
		{
			var mongoClient = new MongoClient(databaseSettings.ConnectionString);

			var mongoDatabase = mongoClient.GetDatabase(databaseSettings.DatabaseName);

			_displayCollection = mongoDatabase.GetCollection<Display>(databaseSettings.DisplayCollectionName);
		}

        public async Task<Display> CreateAsync(Display entity)
        {
			await _displayCollection.InsertOneAsync(entity);
			return entity;
        }

        public async Task<IEnumerable<Display>> GetAllAsync()
		{
			var displays = await _displayCollection.Find(_ => true).ToListAsync();

			return displays;
		}

		public async Task<Display> GetByIdAsync(string id)
		{
			// Check if ID is valid objectId, and convert it to one.
			bool isValid = ObjectId.TryParse(id, out ObjectId objectId);
			if (!isValid) {
				throw new ArgumentException($"Given ID \"{id}\" was not a valid Object Id");
			}

            var display = await _displayCollection.Find(x => x._id.Equals(objectId.ToString())).FirstOrDefaultAsync();

            if (display == null)
			{
				throw new ArgumentException("No display found for that Id");
			}

			return display;
		}

        public async Task<Display> UpdateAsync(Display entity)
        {
            var result = await _displayCollection.ReplaceOneAsync(x => x._id.Equals(entity._id), entity);

			if (!result.IsAcknowledged) {
				throw new Exception($"Updating Display with Id {entity._id} failed");
			}

            return entity;
        }

		public async Task DeleteAsync(string id)
        {
            // Check if ID is valid objectId, and convert it to one.
            bool isValid = ObjectId.TryParse(id, out ObjectId objectId);
            if (!isValid)
            {
                throw new ArgumentException($"Given ID \"{id}\" was not a valid Object Id");
            }

            var deleteResult = await _displayCollection.DeleteOneAsync(x => x._id.Equals(objectId.ToString()));

            if (deleteResult.DeletedCount == 0)
            {
                throw new ArgumentException("No display found for that Id");
            }

            return;

        }
    }
}
