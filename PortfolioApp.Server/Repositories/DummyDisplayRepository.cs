using PortfolioApp.Server.Models;
using PortfolioApp.Server.Repositories.Interfaces;

namespace PortfolioApp.Server.Repositories
{
    public class DummyDisplayRepository : IDisplayRepository
    {
        private static List<Display> GetDummyData() {

            var displays = Enumerable.Range(1, 5).Select(index => new Display
            {
                Name = index.ToString(),
                Description = "test",
                DetailDescription = "test but much longer",
                ImageUrl = "NotARealUrl"
            })
            .ToList();

            return displays;
        }

        public IEnumerable<Display> GetAll()
        { 
            return GetDummyData();
        }

        public Display GetById(int id)
        {
            List<Display> dummyData = GetDummyData();
            var display = dummyData.FirstOrDefault(display => display.Id == id);

            if (display == null) {
                throw new ArgumentException("No display found for that Id");
            }

            return display;
        }
    }
}
