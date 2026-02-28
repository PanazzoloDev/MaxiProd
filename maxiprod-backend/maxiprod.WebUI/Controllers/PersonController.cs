using FluentResults;
using maxiprod.Application.DTOs;
using maxiprod.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace maxiprod.WebUI.Controllers
{
    [Route("[controller]")]
    public class PersonController : ControllerBase
    {
        private readonly IPersonService _service;

        public PersonController(IPersonService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<Result<IEnumerable<ViewPersonDTO>>> GetPaged(
            int pageNumber = 1,
            int pageSize = 50
        ){
            return await _service.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<Result<ViewPersonDTO>> GetById(int id)
        {
            return await _service.GetByIdAsync(id);
        }

        [HttpPost]
        public async Task<Result<ViewPersonDTO>> Create([FromBody] CreatePersonDTO model)
        {
            return await _service.CreateAsync(model);
        }

        [HttpPut("{id}")]
        public async Task<Result<ViewPersonDTO>> Update(int id, [FromBody] UpdatePersonDTO model)
        {
            return await _service.UpdateAsync(id, model);
        }

        [HttpDelete("{id}")]
        public async Task<Result<bool>> Delete(int id)
        {
            return await _service.DeleteByIdAsync(id);
        }
    }
}
