using Microsoft.AspNetCore.Mvc;
using TaskTracking.Business.Abstract;
using TaskTracking.Core.Entities.Concrete;

namespace TaskTracking.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly ICompanyService _companyService;
        public CompaniesController(ICompanyService companyService) => _companyService = companyService;

        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            var result = _companyService.GetAll();
            return result.Success ? Ok(result) : BadRequest(result);
        }

        [HttpPost("add")] // 🚀 DÜZELTME: Buraya Etiket Eklendi
        public IActionResult Add(Company company)
        {
            var result = _companyService.Add(company);
            return result.Success ? Ok(result) : BadRequest(result);
        }

        [HttpPut("update")]
        public IActionResult Update(Company company)
        {
            var result = _companyService.Update(company);
            if (result.Success) return Ok(result);
            return BadRequest(result);
        }

        [HttpDelete("delete")]
        public IActionResult Delete([FromQuery] int id)
        {
            var companyToDelete = new Company { Id = id };
            var result = _companyService.Delete(companyToDelete);
            if (result.Success) return Ok(result);
            return BadRequest(result);
        }
    }
}