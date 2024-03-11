using MongoDB.Driver;
using PortfolioApp.Server.DbModels;
using PortfolioApp.Server.Repositories.Interfaces;
using PortfolioApp.Server.Models;
using MongoDB.Bson;

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
	}
}
