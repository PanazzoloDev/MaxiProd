using AutoMapper;
using FluentResults;
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
            IMapper mapper) : base (repository, mapper){}

        /// <summary>
        /// Permite atualizar somente algumas propriedades da transacao e valida a alteração
        /// </summary>
        public override async Task<Result<ViewTransactionDTO>> UpdateAsync(int id, UpdateTransactionDTO view)
        {
            var model = await _repository.GetByIdAsync(id);
            if (model == null)
                return Result.Fail("Registro não encontrado.");

            try
            {
                model.Update(view.Description, view.Amount);

                await _repository.UpdateAsync(model);
                return Result.Ok(_mapper.Map<Transaction, ViewTransactionDTO>(model));
            }
            catch (Exception ex)
            {
                return Result.Fail(ex.Message);
            }
        }
    }
}
