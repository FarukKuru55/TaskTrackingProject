using Microsoft.AspNetCore.Mvc;
using TaskTracking.Business.Abstract;
using TaskTracking.Core.Entities.Concrete;

namespace TaskTracking.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffsController : ControllerBase
    {
        private readonly IStaffService _staffService;

        public StaffsController(IStaffService staffService)
        {
            _staffService = staffService;
        }

        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            var result = _staffService.GetAll();
            if (result.Success) return Ok(result);
            return BadRequest(result);
        }

        [HttpPost("add")]
        public IActionResult Add(Staff staff)
        {
            var result = _staffService.Add(staff);
            if (result.Success) return Ok(result);
            return BadRequest(result);
        }

        [HttpPut("u bapdate")]
        public IActionResult Update(Staff staff)
        {
            var result = _staffService.Update(staff);
            if (result.Success) return Ok(result);
            return BadRequest(result);
        }

        [HttpDelete("delete")]
        public IActionResult Delete (Staff staff)
        {
            var result = _staffService.Delete(staff);
            if (result.Success) return Ok(result);
            return BadRequest(result);
        }
    }
}