using maxiprod.Domain.Entities;
using maxiprod.Domain.Interfaces;

namespace maxiprod.Infra.Data.Repositories
{
    public class TransactionRepository : BaseRepository<Transaction>, ITransactionRepository
    {
        /// <summary>
        /// Metodos especificos para a transacao devem ser 
        /// implementados aqui, além dos herdados da base
        /// </summary>
        public TransactionRepository(Context.ApplicationContext context) : base(context){}
    }
}
