using Microsoft.AspNetCore.Mvc;
using TaskTracking.Business.Abstract;
using TaskTracking.Core.Entities.Concrete;
using TaskTracking.Core.DTOs.TaskItem;

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

        [HttpGet("gettaskdetails")]
        public IActionResult GetTaskDetails()
        {
            // Sonundaki virgülü sildik! 🚀
            var result = _taskItemService.GetTaskDetails();

            foreach (var task in result.Data)
            {
                System.Diagnostics.Debug.WriteLine($"GÖREV ID: {task.Id} - BAŞLIK: {task.Title} - TARİH: {task.DueDate}");
            }

            if (result.Success) return Ok(result);
            return BadRequest(result);
        }

        [HttpPost("add")]
        public IActionResult Add(TaskItemCreateDto taskItemCreateDto) // <-- Parametreyi DTO yaptık
        {
            var result = _taskItemService.Add(taskItemCreateDto);
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
        public IActionResult Update([FromBody] TaskItemUpdateDto taskItemUpdateDto) 
        {
            var result = _taskItemService.Update(taskItemUpdateDto);
            if (result.Success) return Ok(result);
            return BadRequest(result);
        }

        [HttpDelete("delete")]
        public IActionResult Delete(int id) // <-- Sadece int id beklesin
        {
            // Önce id ile nesneyi bulalım
            var taskToDelete = _taskItemService.GetById(id).Data;
            if (taskToDelete == null) return BadRequest("Görev bulunamadı.");

            var result = _taskItemService.Delete(taskToDelete);
            if (result.Success) return Ok(result);
            return BadRequest(result);
        }
    }
}