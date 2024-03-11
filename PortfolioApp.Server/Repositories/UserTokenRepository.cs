using PortfolioApp.Server.DbModels;
using PortfolioApp.Server.Models;
using PortfolioApp.Server.Repositories.Interfaces;

namespace PortfolioApp.Server.Repositories
{
    public class UserTokenRepository : GenericRepository<UserToken>, IUserTokenRepository
    {
        public UserTokenRepository(DatabaseSettings settings): base(settings) { }
    }
}
