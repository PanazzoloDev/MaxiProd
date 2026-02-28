using maxiprod.Domain.Entities;

namespace maxiprod.Domain.Interfaces
{
    /// <summary>
    /// Métodos específicos para a categoria devem ser adicionados aqui para o servico de injecao
    /// mapear para a Application
    /// </summary>
    public interface ICategoryRepository : IRepositoryBase<Category>
    {
    }
}
