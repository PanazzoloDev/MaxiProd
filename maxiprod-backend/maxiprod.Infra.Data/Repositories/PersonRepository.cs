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

        public async Task<IEnumerable<Person>> GetPeopleWithTransactionsAsync(int pageNumber, int pageSize)
        {
            int skip = (pageNumber - 1) * pageSize;
            return await _dbSet
                   .Include(x => x.Transactions)
                   .OrderBy(e => EF.Property<int>(e, "Id")) // Importante para evitar duplicação de registros entre paginas
                   .Skip(skip)
                   .Take(pageSize)
                   .ToListAsync();
        }
    }
}
