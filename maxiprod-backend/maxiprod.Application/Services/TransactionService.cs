using AutoMapper;
using FluentResults;
using maxiprod.Application.DTOs;
using maxiprod.Application.Interfaces;
using maxiprod.Domain.Entities;
using maxiprod.Domain.Enums;
using maxiprod.Domain.Interfaces;
using System.Reflection;

namespace maxiprod.Application.Services
{
    public class TransactionService : ServiceBase<Transaction, CreateTransactionDTO, UpdateTransactionDTO, ViewTransactionDTO>, ITransactionService
    {
        private readonly IPersonRepository _personRepository;
        private readonly ICategoryRepository _categoryRepository;

        /// Métodos especificos para o servico devem ser implementados aqui
        public TransactionService(
            ITransactionRepository repository,
            IPersonRepository personRepository,
            ICategoryRepository categoryRepository,
            IMapper mapper) : base (repository, mapper)
        {
            _personRepository = personRepository;
            _categoryRepository = categoryRepository;
        }

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
                return Result.Fail(ex.InnerException?.Message ?? ex.Message);
            }
        }

        public override async Task<Result<ViewTransactionDTO>> CreateAsync(CreateTransactionDTO view)
        {
            try
            {
                var model = _mapper.Map<CreateTransactionDTO, Transaction>(view);

                var person = await _personRepository
                    .GetByIdAsync(view.PersonId);

                var category = await _categoryRepository
                    .GetByIdAsync(view.CategoryId);

                if (person == null)
                    return Result.Fail("Pessoa não encontrada.");

                if (category == null)
                    return Result.Fail("Categoria não encontrada.");

                if (!CanCreateWithRevenueType(person.Age, view.Type))
                    return Result.Fail("Não são permitidas transações de receitas à menores de idade");

                if(!HasCompatibleCategoryForTransactionType(category.Purpose, view.Type))
                    return Result.Fail("Categoria não é compativel com o tipo de transação.");

                await _repository.CreateAsync(model);
                return Result.Ok(_mapper.Map<Transaction, ViewTransactionDTO>(model));
            }
            catch (Exception ex)
            {
                return Result.Fail(ex.InnerException?.Message ?? ex.Message);
            }
        }

        /// <summary>
        /// Verifica se a categoria é apropriada para o tipo de transação, ou seja, se a categoria
        /// cadastrada é compatível com o tipo da nova transação.
        /// </summary>
        /// <param name="purpose"></param>
        /// <param name="type"></param>
        /// <returns>Retorna um boleano indicando se pode ou não criar a transação</returns>
        private static bool HasCompatibleCategoryForTransactionType(PurposeEnum purpose, int type)
        {
            if (purpose == PurposeEnum.RevenueAndExpenses) return true;

            if (purpose == (PurposeEnum)type) return true;

            return false;
        }

        /// <summary>
        /// Se é de menor e o tipo de transação é receita, não é permitido criar a transação
        /// </summary>
        /// <param name="age"></param>
        /// <param name="type"></param>
        /// <returns>Retorna um boleano indicando se pode ou não criar a transação</returns>
        private static bool CanCreateWithRevenueType(int age, int type)
        {
            if (age < 18 && ((TransactionTypeEnum)type) == TransactionTypeEnum.Revenue)
                return false;

             return true;
        }
    }
}
