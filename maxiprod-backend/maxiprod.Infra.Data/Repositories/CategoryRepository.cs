using maxiprod.Domain.Entities;
using maxiprod.Domain.Interfaces;

namespace maxiprod.Infra.Data.Repositories
{
    public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
    {
        /// <summary>
        /// Metodos especificos para a Categoria devem ser 
        /// implementados aqui, além dos herdados da base
        /// </summary>
        public CategoryRepository(Context.ApplicationContext context) : base(context){}
    }
}
