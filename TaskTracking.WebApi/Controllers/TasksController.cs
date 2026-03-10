using Microsoft.AspNetCore.Mvc;
using TaskTracking.Business.Abstract;
using TaskTracking.Core.Entities.Concrete;

namespace TaskTracking.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ITaskItemService _taskItemService;

        public TasksController(ITaskItemService taskItemService)
        {
            _taskItemService = taskItemService;
        }

        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            var result = _taskItemService.GetAll();
            if (result.Success) return Ok(result);
            return BadRequest(result);
        }

        [HttpPost("add")]
        public IActionResult Add(TaskItem taskItem)
        {
            var result = _taskItemService.Add(taskItem);
            if (result.Success) return Ok(result);
            return BadRequest(result);
        }

        [HttpPost("completetask")]
        public IActionResult CompleteTask(int taskId, int staffId, string description, string documentUrl)
        {
            var result = _taskItemService.CompleteTask(taskId, staffId, description, documentUrl);
            if (result.Success) return Ok(result);
            return BadRequest(result);
        }

        [HttpPut("update")]
        public IActionResult Update(TaskItem taskItem)
        {
            var result = _taskItemService.Update(taskItem);
            if (result.Success) return Ok(result);
            return BadRequest(result);
        }

        [HttpDelete("delete")]
        public IActionResult Delete(TaskItem taskItem)
        {
            var result = _taskItemService.Delete(taskItem);
            if (result.Success) return Ok(result);
            return BadRequest(result);
        }

    }
}