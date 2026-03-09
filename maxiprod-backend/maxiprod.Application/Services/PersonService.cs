using AutoMapper;
using FluentResults;
using maxiprod.Application.DTOs;
using maxiprod.Application.Interfaces;
using maxiprod.Domain.Entities;
using maxiprod.Domain.Interfaces;

namespace maxiprod.Application.Services
{
    public class PersonService : ServiceBase<Person, CreatePersonDTO, UpdatePersonDTO, ViewPersonDTO>, IPersonService
    {
        new private readonly IPersonRepository _repository;

        /// Métodos especificos para o servico devem ser implementados aqui
        public PersonService(
            IPersonRepository repository,
            IMapper mapper) : base (repository, mapper)
        {
            _repository = repository;
        }

        public async Task<Result<FinancialSummaryResultDTO>> GetFinancialSummaryAsync(int pageNumber, int pageSize)
        {
            try
            {
                var people = await _repository
                    .GetPeopleWithTransactionsAsync(pageNumber, pageSize);

                var personSummaryList = new List<PersonFinancialSummaryDTO>();
                var peopleCount = 0; // Contador para evitar o uso de Count()

                foreach (var person in people)
                {
                    personSummaryList.Add(
                        new PersonFinancialSummaryDTO
                        {
                            Person = _mapper.Map<Person, ViewPersonDTO>(person),
                            TotalExpense = person.Transactions
                                .Where(t => t.Type == Domain.Enums.TransactionTypeEnum.Expenses)
                                .Sum(t => t.Amount),
                            TotalRevenue = person.Transactions
                                .Where(t => t.Type == Domain.Enums.TransactionTypeEnum.Revenue)
                                .Sum(t => t.Amount)
                        }
                     );
                    peopleCount++;
                }

                var result = new FinancialSummaryResultDTO
                {
                    Data = personSummaryList,
                    RegisterCount = peopleCount,
                    TotalExpenses = personSummaryList.Sum(x => x.TotalExpense),
                    TotalRevenue = personSummaryList.Sum(x => x.TotalRevenue),
                    TotalBalance = personSummaryList.Sum(x => x.Balance)
                };

                return Result.Ok(result);
            }
            catch (Exception ex)
            {
                return Result.Fail(ex.Message);
            }
        }

        /// <summary>
        /// Permite atualizar somente algumas propriedades da pessoa e valida a alteração
        /// </summary>
        public override async Task<Result<ViewPersonDTO>> UpdateAsync(int id, UpdatePersonDTO view)
        {
            var model = await _repository.GetByIdAsync(id);
            if (model == null)
                return Result.Fail("Registro não encontrado.");

            try
            {
                if (HasRevenueTransaction(model.Id) == true)
                    return Result.Fail("Existem transações de receitas");

                model.Update(view.Name, view.Age);

                await _repository.UpdateAsync(model);
                return Result.Ok(_mapper.Map<Person, ViewPersonDTO>(model));
            }
            catch (Exception ex)
            {
                return Result.Fail(ex.Message);
            }
        }

        /// <summary>
        /// Se caso for necessário reduzir a idade, não deve
        /// existir transações do tipo receita cadastrada.
        /// </summary>
        /// <param name="personId"></param>
        /// <returns>bool?</returns>
        private bool? HasRevenueTransaction(int personId)
        {
            return _repository.GetAllAsync()
                .FirstOrDefault(p => p.Id == personId)?
                .Transactions
                .Any(t => t.Type == Domain.Enums.TransactionTypeEnum.Revenue);
        }
    }
}
