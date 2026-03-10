using Microsoft.AspNetCore.Mvc;
using TaskTracking.Business.Abstract;
using TaskTracking.Core.Entities.Concrete;

namespace TaskTracking.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskStaffsController : ControllerBase
    {
        private readonly ITaskStaffService _taskStaffService;

        public TaskStaffsController(ITaskStaffService taskStaffService)
        {
            _taskStaffService = taskStaffService;
        }

        [HttpPost("assign")]
        public IActionResult Assign(TaskStaff taskStaff)
        {
            var result = _taskStaffService.AssignStaffToTask(taskStaff);
            return result.Success ? Ok(result) : BadRequest(result);
        }

        [HttpDelete("remove")]
        public IActionResult Remove(int taskStaffId)
        {
            var result = _taskStaffService.RemoveStaffFromTask(taskStaffId);
            return result.Success ? Ok(result) : BadRequest(result);
        }
    }
}