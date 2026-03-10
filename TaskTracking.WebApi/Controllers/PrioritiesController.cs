using Microsoft.AspNetCore.Mvc;
using TaskTracking.Business.Abstract;
using TaskTracking.Core.Entities.Concrete;

namespace TaskTracking.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrioritiesController : ControllerBase
    {
        private readonly IPriorityService _priorityService;

        public PrioritiesController(IPriorityService priorityService)
        {
            _priorityService = priorityService;
        }

        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            var result = _priorityService.GetAll();
            if (result.Success) return Ok(result);
            return BadRequest(result);
        }

        [HttpPost("add")]
        public IActionResult Add(Priority priority)
        {
            var result = _priorityService.Add(priority);
            if (result.Success) return Ok(result);
            return BadRequest(result);
        }
    }
}