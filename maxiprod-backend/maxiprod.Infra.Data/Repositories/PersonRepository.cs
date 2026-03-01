using maxiprod.Domain.Entities;
using maxiprod.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace maxiprod.Infra.Data.Repositories
{
    public class PersonRepository : BaseRepository<Person>, IPersonRepository
    {
        /// <summary>
        /// Metodos especificos para a pessoa devem ser 
        /// implementados aqui, além dos herdados da base
        /// </summary>
        public PersonRepository(Context.ApplicationContext context) : base(context){}

        public async Task<IEnumerable<Person>> GetPeopleWithTransactionsAsync()
        {
            return await _dbSet
                .AsNoTracking()
                .Include(x => x.Transactions)
                .ToListAsync();
        }
    }
}
