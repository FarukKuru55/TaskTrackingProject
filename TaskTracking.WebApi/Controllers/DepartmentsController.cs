using Microsoft.AspNetCore.Mvc;
using TaskTracking.Business.Abstract;
using TaskTracking.Core.Entities.Concrete;

namespace TaskTracking.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly IDepartmentService _departmentService;
        public DepartmentsController(IDepartmentService departmentService) => _departmentService = departmentService;

        [HttpGet("getall")]
        public IActionResult GetAll() => Ok(_departmentService.GetAll());

        [HttpPost("add")]
        public IActionResult Add(Department department) => Ok(_departmentService.Add(department));

        [HttpPut("update")]
        public IActionResult Update(Department department) => Ok(_departmentService.Update(department));

        [HttpDelete("delete")]
        public IActionResult Delete(Department department) => Ok(_departmentService.Delete(department));
    }
}