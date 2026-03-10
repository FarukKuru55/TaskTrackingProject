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
            return result.Success ? Ok(result) : BadRequest(result);
        }

        [HttpPost("add")]
        public IActionResult Add(Priority priority)
        {
            var result = _priorityService.Add(priority);
            return result.Success ? Ok(result) : BadRequest(result);
        }

        [HttpPut("update")]
        public IActionResult Update(Priority priority)
        {
            var result = _priorityService.Update(priority);
            return result.Success ? Ok(result) : BadRequest(result);
        }

        [HttpDelete("delete")]
        public IActionResult Delete(Priority priority)
        {
            var result = _priorityService.Delete(priority);
            return result.Success ? Ok(result) : BadRequest(result);
        }
    }
}