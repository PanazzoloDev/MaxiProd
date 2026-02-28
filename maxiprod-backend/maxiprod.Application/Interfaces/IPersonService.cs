using maxiprod.Application.DTOs;

namespace maxiprod.Application.Interfaces
{
    public interface IPersonService : IServiceBase<CreatePersonDTO, UpdatePersonDTO, ViewPersonDTO>
    {
        /// Métodos especificos para o servico devem ser declarados aqui para o servico de Injecao
    }
}
