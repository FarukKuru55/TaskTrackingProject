using Microsoft.AspNetCore.Mvc;
using TaskTracking.Business.Abstract;

namespace TaskTracking.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskStatusController : ControllerBase
    {
        private readonly ITaskStatusService _taskStatusService;
        public TaskStatusController(ITaskStatusService taskStatusService) => _taskStatusService = taskStatusService;

        [HttpGet("getall")]
        public IActionResult GetAll() => Ok(_taskStatusService.GetAll());

        [HttpPost("add")]
        public IActionResult Add(TaskTracking.Core.Entities.Concrete.TaskStatus taskStatus) => Ok(_taskStatusService.Add(taskStatus));

        [HttpPut("update")]
        public IActionResult Update(TaskTracking.Core.Entities.Concrete.TaskStatus taskStatus) => Ok(_taskStatusService.Update(taskStatus));

        [HttpDelete("delete")]
        public IActionResult Delete(TaskTracking.Core.Entities.Concrete.TaskStatus taskStatus) => Ok(_taskStatusService.Delete(taskStatus));
    }
}