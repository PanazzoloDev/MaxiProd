using maxiprod.Domain.Entities;
using maxiprod.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace maxiprod.Infra.Data.Repositories
{
    public class TransactionRepository : BaseRepository<Transaction>, ITransactionRepository
    {
        /// <summary>
        /// Metodos especificos para a transacao devem ser 
        /// implementados aqui, além dos herdados da base
        /// </summary>
        public TransactionRepository(Context.ApplicationContext context) : base(context){}

        public override async Task<IEnumerable<Transaction>> GetPagedAsync(int pageNumber, int sizeOfPage)
        {
            int skip = (pageNumber - 1) * sizeOfPage;
            return await _dbSet
                .Include(x => x.Category)
                .Include(x => x.Person)
                .OrderBy(e => EF.Property<int>(e, "Id"))
                .Skip(skip)
                .Take(sizeOfPage)
                .ToListAsync();
        }
    }
}
