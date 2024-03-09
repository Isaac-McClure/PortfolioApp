using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PortfolioApp.Server.DbModels;
using PortfolioApp.Server.Models;
using PortfolioApp.Server.Repositories.Interfaces;


namespace PortfolioApp.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DisplayController : ControllerBase
    {
        private readonly ILogger<DisplayController> _logger;
        private readonly IMapper _mapper;
        private readonly IDisplayRepository _repository;

        public DisplayController(ILogger<DisplayController> logger, IMapper mapper, IDisplayRepository repository)
        {
            _logger = logger;
            _mapper = mapper;
            _repository = repository;
        }

        [HttpGet]
        [Route("GetById/{id}")]
        public async Task<ActionResult<DisplayDto>> GetById(string id) 
        {
            try
            {
                var display = await _repository.GetByIdAsync(id);

                var displayDto = _mapper.Map<DisplayDto>(display);

                return Ok(displayDto);
            }
            catch (ArgumentException ex) 
            {
                _logger.LogError(LogEventId.DisplayControllerError, ex, "Argument exception in DisplayController GetById");
                return NotFound();
            }
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<ActionResult<IEnumerable<DisplayDto>>> GetAll()
        {
            try
            {
                var displays = await _repository.GetAllAsync();

                var displayDtos = _mapper.Map<List<DisplayDto>>(displays);

                return Ok(displayDtos);
            }
            catch (Exception ex) {
                _logger.LogError(LogEventId.DisplayControllerError, ex, "Exception in DisplayController GetAll");
                return StatusCode(500);
            }
        }
    }
}
