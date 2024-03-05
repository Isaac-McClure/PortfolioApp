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

        [HttpGet]
        [Route("GetById/{id}")]
        public ActionResult<Display> GetById(int id) 
        {
            try
            {
                var display = _repository.GetById(id);

                return Ok(display);
            }
            catch (ArgumentException ex) 
            {
                _logger.LogError(LogEventId.DisplayControllerError, ex, "Argument exception in DisplayController GetById");
                return NotFound();
            }
        }

        [HttpGet]
        [Route("GetAll")]
        public ActionResult<IEnumerable<Display>> GetAll()
        {
            var displays = _repository.GetAll();

            return Ok(displays);
        }
    }
}
