namespace PortfolioApp.Server.Repositories.Interfaces
{
    public interface IRepository<T> where T : class
    {
        T GetById(int id);
        IEnumerable<T> GetAll();
    }
}
