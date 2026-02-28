namespace maxiprod.Domain.Interfaces
{
    public interface IRepositoryBase<T> where T : class
    {
        Task<T?> GetByIdAsync(int id);

        Task<IEnumerable<T>> GetAllAsync();

        Task<IEnumerable<T>> GetPagedAsync(int pageNumber, int sizeOfPage);

        Task<T> CreateAsync(T entity);

        Task<T?> UpdateAsync(T entity);

        Task<bool> DeleteByIdAsync(int id);

        Task<bool> DeleteAsync(T entity);
    }
}
