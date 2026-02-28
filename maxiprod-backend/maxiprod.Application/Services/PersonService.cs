using maxiprod.Application.DTOs;
using maxiprod.Application.Interfaces;
using maxiprod.Domain.Entities;
using maxiprod.Domain.Interfaces;

namespace maxiprod.Application.Services
{
    public class PersonService : ServiceBase<Person, CreatePersonDTO, UpdatePersonDTO, ViewPersonDTO>, IPersonService
    {
        /// Métodos especificos para o servico devem ser implementados aqui
        public PersonService(
            IPersonRepository repository,
            IMapperService mapper) : base (repository, mapper)
        {
           
        }
    }
}
