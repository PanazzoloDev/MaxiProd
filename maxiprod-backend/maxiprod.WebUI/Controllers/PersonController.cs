using FluentResults;
using maxiprod.Application.DTOs;
using maxiprod.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace maxiprod.WebUI.Controllers
{
    [Route("api/[controller]")]
    public class PersonController : ControllerBase
    {
        private readonly IPersonService _service;

        public PersonController(IPersonService service)
        {
            _service = service;
        }

        [HttpGet("financial-summary")]
        public async Task<Result<FinancialSummaryResultDTO>> GetPaged(){
            return await _service.GetFinancialSummaryAsync();
        }

        [HttpGet]
        public async Task<Result<IEnumerable<ViewPersonDTO>>> GetPaged(
            int pageNumber = 1,
            int pageSize = 50
        )
        {
            return await _service.GetPagedAsync(pageNumber, pageSize);
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
            if (id != model.Id)
                return Result.Fail("O id fornecido na URL não é igual ao id do novo registro.");

            return await _service.UpdateAsync(id, model);
        }

        [HttpDelete("{id}")]
        public async Task<Result<bool>> Delete(int id)
        {
            return await _service.DeleteByIdAsync(id);
        }
    }
}
