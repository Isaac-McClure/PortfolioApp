using PortfolioApp.Server.DbModels;

namespace PortfolioApp.Server.Repositories.Interfaces
{
    public interface IUserRepository: IRepository<User>
    {
        Task<User> GetByUsernameAsync(string username);
    }
}
