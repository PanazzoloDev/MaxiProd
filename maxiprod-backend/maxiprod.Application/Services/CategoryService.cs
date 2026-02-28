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
            IMapperService mapper) : base (repository, mapper)
        {
           
        }
    }
}
