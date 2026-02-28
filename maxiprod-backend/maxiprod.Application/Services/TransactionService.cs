using maxiprod.Application.DTOs;
using maxiprod.Application.Interfaces;
using maxiprod.Domain.Entities;
using maxiprod.Domain.Interfaces;

namespace maxiprod.Application.Services
{
    public class TransactionService : ServiceBase<Transaction, CreateTransactionDTO, UpdateTransactionDTO, ViewTransactionDTO>, ITransactionService
    {
        /// Métodos especificos para o servico devem ser implementados aqui
        public TransactionService(
            ITransactionRepository repository,
            IMapperService mapper) : base (repository, mapper)
        {
           
        }
    }
}
