using maxiprod.Application.DTOs;

namespace maxiprod.Application.Interfaces
{
    public interface ITransactionService : IServiceBase<CreateTransactionDTO, UpdateTransactionDTO, ViewTransactionDTO>
    {
        /// Métodos especificos para o servico devem ser declarados aqui para o servico de Injecao
    }
}
