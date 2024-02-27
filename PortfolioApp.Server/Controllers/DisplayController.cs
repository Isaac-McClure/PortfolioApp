using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using PortfolioApp.Server.Models;
using PortfolioApp.Server.Repositories.Interfaces;


namespace PortfolioApp.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DisplayController : ControllerBase
    {
        private readonly ILogger<DisplayController> _logger;
        private readonly IDisplayRepository _repository;

        public DisplayController(ILogger<DisplayController> logger, IDisplayRepository repository)
        {
            _logger = logger;
            _repository = repository;
        }

        [HttpGet("getDisplayById/{id}")]
        public ActionResult<Display> GetById(int id) 
        {
            try
            {
                var display = _repository.GetById(id);

                return Ok(display);
            }
            catch (ArgumentException ex) 
            {
                return NotFound();
            }
        }

        [HttpGet]
        [Route("getAll")]
        public ActionResult<IEnumerable<Display>> GetAll()
        {
            var displays = Enumerable.Range(1, 5).Select(index => new Display
            {
                Name = index.ToString(),
                Description = "test",
                DetailDescription = "test but much longer",
                ImageUrl = HttpContext.Request.GetDisplayUrl()
            })
            .ToArray();

            return Ok(displays);
        }
    }
}
