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

        [HttpGet]
        public async Task<Result<IEnumerable<ViewCategoryDTO>>> GetPaged(
            int pageNumber = 1,
            int pageSize = 50
        ){
            return await _service.GetPagedAsync(pageNumber, pageSize);
        }

        [HttpGet("{id}")]
        public async Task<Result<ViewCategoryDTO>> GetById(int id)
        {
            return await _service.GetByIdAsync(id);
        }

        [HttpPost]
        public async Task<Result<ViewCategoryDTO>> Create([FromBody] CreateCategoryDTO model)
        {
            return await _service.CreateAsync(model);
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
        public async Task<Result<bool>> Delete(int id)
        {
            return await _service.DeleteByIdAsync(id);
        }
    }
}
