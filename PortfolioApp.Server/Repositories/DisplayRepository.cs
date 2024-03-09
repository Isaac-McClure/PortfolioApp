using MongoDB.Driver;
using PortfolioApp.Server.DbModels;
using PortfolioApp.Server.Repositories.Interfaces;
using PortfolioApp.Server.Models;

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
            // TODO: Make id a valid monbo bson id objectId thing see https://stackoverflow.com/questions/27019513/system-formatexception-occurred-in-mongodb-bson-dll-xxx-is-not-a-valid-24-dig

            var display = await _displayCollection.Find(x => x._id.Equals(id)).FirstOrDefaultAsync();

            if (display == null)
			{
				throw new ArgumentException("No display found for that Id");
			}

			return display;
		}
	}
}
