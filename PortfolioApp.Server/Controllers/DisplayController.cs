using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using PortfolioApp.Server.Models;


namespace PortfolioApp.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DisplayController : ControllerBase
    {
        private readonly ILogger<DisplayController> _logger;

        public DisplayController(ILogger<DisplayController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Display>> Get()
        {
            var displays = Enumerable.Range(1, 5).Select(index => new Display
            {
                Name = index.ToString(),
                Description = "test",
                ImageUrl = HttpContext.Request.GetDisplayUrl()
            })
            .ToArray();

            return Ok(displays);
        }
    }
}
