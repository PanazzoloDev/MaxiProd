using maxiprod.Domain.Entities;
using maxiprod.Domain.Interfaces;

namespace maxiprod.Infra.Data.Repositories
{
    public class PersonRepository : BaseRepository<Person>, IPersonRepository
    {
        /// <summary>
        /// Metodos especificos para a pessoa devem ser 
        /// implementados aqui, além dos herdados da base
        /// </summary>
        public PersonRepository(Context.ApplicationContext context) : base(context){}
    }
}
