using FluentResults;
using maxiprod.Application.DTOs;
using maxiprod.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace maxiprod.WebUI.Controllers
{
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _service;

        public CategoryController(ICategoryService service)
        {
            _service = service;
        }

        [HttpPost("query")]
        public async Task<IActionResult> GetPaged(
            int pageNumber = 1,
            int pageSize = 50
        ){
            var results = await _service.GetPagedAsync(pageNumber, pageSize);

            if (results.IsFailed)
                return BadRequest(results.Errors.Select(e => e.Message));

            return Ok(results.Value);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);

            if (result.IsFailed)
                return BadRequest(result.Errors.Select(e => e.Message));

            return Ok(result.Value);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCategoryDTO model)
        {
            var result = await _service.CreateAsync(model);

            if (result.IsFailed)
                return BadRequest(result.Errors.Select(e => e.Message));

            return Created();
        }

        //[HttpPut("{id}")]
        //public async Task<Result<ViewCategoryDTO>> Update(int id, [FromBody] UpdateCategoryDTO model)
        //{
        //    if(id != model.Id)
        //        return Result.Fail("O id fornecido na URL não é igual ao id do novo registro.");
        //    
        //    return await _service.UpdateAsync(id, model);
        //}

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.DeleteByIdAsync(id);

            if (result.IsFailed)
                return BadRequest(result.Errors.Select(e => e.Message));

            return Ok(result.Value);
        }
    }
}
