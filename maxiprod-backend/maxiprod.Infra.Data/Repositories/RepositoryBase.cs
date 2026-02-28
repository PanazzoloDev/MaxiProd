using maxiprod.Domain.Interfaces;
using maxiprod.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace maxiprod.Infra.Data.Repositories
{
    public class BaseRepository<T> : IRepositoryBase<T> where T : class
    {
        internal readonly ApplicationContext _context;
        internal readonly DbSet<T> _dbSet;

        public BaseRepository(ApplicationContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public async Task<T> CreateAsync(T entity)
        {
            _dbSet.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<bool> DeleteAsync(T entity)
        {
            _dbSet.Remove(entity);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<T?> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<T?> UpdateAsync(T entity)
        {
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<bool> DeleteByIdAsync(int id)
        {
            var entity = await _dbSet.FindAsync(id);
            //Early return 
            if (entity == null) return false;
            
            _dbSet.Remove(entity);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<T>> GetPagedAsync(int pageNumber, int sizeOfPage)
        {
            int skip = (pageNumber - 1) * sizeOfPage;
            return await _dbSet
                   .OrderBy(e => EF.Property<int>(e, "Id")) // Importante para evitar duplicação de registros entre paginas
                   .Skip(skip)
                   .Take(sizeOfPage)
                   .ToListAsync();
        }
    }
}
