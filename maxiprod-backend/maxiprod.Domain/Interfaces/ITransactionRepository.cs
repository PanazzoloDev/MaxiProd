
using maxiprod.Domain.Entities;

namespace maxiprod.Domain.Interfaces
{
    /// <summary>
    /// Métodos específicos para a transação devem ser adicionados aqui para o servicoe de injecao
    /// mapear para a Application
    /// </summary>
    public interface ITransactionRepository : IRepositoryBase<Transaction>
    {
    }
}
