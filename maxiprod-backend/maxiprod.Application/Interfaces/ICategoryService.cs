using maxiprod.Application.DTOs;

namespace maxiprod.Application.Interfaces
{
    public interface ICategoryService : IServiceBase<CreateCategoryDTO, UpdateCategoryDTO, ViewCategoryDTO>
    {
        /// Métodos especificos para o servico devem ser declarados aqui para o servico de Injecao
    }
}
