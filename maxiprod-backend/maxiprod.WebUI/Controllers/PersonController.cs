using FluentResults;
using maxiprod.Application.DTOs;
using maxiprod.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace maxiprod.WebUI.Controllers
{
    [Route("api/people")]
    public class PersonController : ControllerBase
    {
        private readonly IPersonService _service;

        public PersonController(IPersonService service)
        {
            _service = service;
        }

        [HttpPost("financial-summary")]
        public async Task<IActionResult> GetFinancialSummaryPaged(
            int pageNumber = 1,
            int pageSize = 50
         ){
            var result = await _service.GetFinancialSummaryAsync(pageNumber, pageSize);

            if (result.IsFailed)
                return BadRequest(result.Errors.Select(e => e.Message));

            return Ok(result.Value);
        }

        [HttpPost("query")]
        public async Task<IActionResult> GetPaged(
            int pageNumber = 1,
            int pageSize = 50
        )
        {
            var result = await _service.GetPagedAsync(pageNumber, pageSize);

            if (result.IsFailed)
                return BadRequest(result.Errors.Select(e => e.Message));

            return Ok(result.Value);
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
        public async Task<IActionResult> Create([FromBody] CreatePersonDTO model)
        {
            var result = await _service.CreateAsync(model);

            if (result.IsFailed)
                return BadRequest(result.Errors.Select(e => e.Message));

            return Created();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdatePersonDTO model)
        {
            if (id != model.Id)
                return BadRequest("O id fornecido na URL não é igual ao id do novo registro.");

            var result = await _service.UpdateAsync(id, model);

            if (result.IsFailed)
                return BadRequest(result.Errors.Select(e => e.Message));

            return Ok(result.Value);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.DeleteByIdAsync(id);

            if (result.IsFailed)
                return BadRequest(result.Errors.Select(e => e.Message));

            return Ok();
        }
    }
}
