using MongoDB.Bson;
using MongoDB.Driver;
using PortfolioApp.Server.DbModels;
using PortfolioApp.Server.Models;
using PortfolioApp.Server.Repositories.Interfaces;

namespace PortfolioApp.Server.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(DatabaseSettings settings): base(settings) { }

        public async Task<User> GetByUsernameAsync(string username) 
        {
            var display = await _collection.Find(x => x.Username.Equals(username)).FirstOrDefaultAsync();

            return display;
        }
    }
}
