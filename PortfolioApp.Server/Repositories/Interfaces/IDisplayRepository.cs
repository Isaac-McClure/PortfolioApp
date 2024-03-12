using PortfolioApp.Server.DbModels;

namespace PortfolioApp.Server.Repositories.Interfaces
{
    public interface IDisplayRepository : IRepository<Display>
    {
        Task<Display> UpdateAsync(Display entity);
        Task DeleteAsync(string id);
    }
}
