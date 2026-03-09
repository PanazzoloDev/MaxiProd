using AutoMapper;
using FluentResults;
using maxiprod.Application.DTOs;
using maxiprod.Application.Interfaces;
using maxiprod.Domain.Entities;
using maxiprod.Domain.Interfaces;

namespace maxiprod.Application.Services
{
    public class CategoryService : ServiceBase<Category, CreateCategoryDTO, UpdateCategoryDTO, ViewCategoryDTO>, ICategoryService
    {
        /// Métodos especificos para o servico devem ser implementados aqui
        public CategoryService(
            ICategoryRepository repository,
            IMapper mapper) : base (repository, mapper){}

        /// <summary>
        /// Permite atualizar somente algumas propriedades da categoria e valida a alteração
        /// </summary>
        public override async Task<Result<ViewCategoryDTO>> UpdateAsync(int id, UpdateCategoryDTO view)
        {
            var model = await _repository.GetByIdAsync(id);
            if (model == null)
                return Result.Fail("Registro não encontrado.");

            try
            {
                model.Update(view.Description);

                await _repository.UpdateAsync(model);
                return Result.Ok(_mapper.Map<Category, ViewCategoryDTO>(model));
            }
            catch (Exception ex)
            {
                return Result.Fail(ex.Message);
            }
        }
    }
}
