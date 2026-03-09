using maxiprod.Domain.Validations;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static System.Net.Mime.MediaTypeNames;

namespace maxiprod.Domain.Entities
{
    [Table("People")]
    public class Person : BaseEntity
    {
        [Required,MaxLength(200),MinLength(5)]
        public string Name { get;  private set; }

        [Required,Range(0, 120)]
        public int Age { get; private set; }

        public List<Transaction> Transactions { get; set; }

        public Person(int id, string name, int age)
        {
            ValidateDomain(
                id: id,
                name: name,
                age: age
            );
        }

        public Person(string name, int age)
        {
            ValidateDomain(
                id: null,
                name: name,
                age: age
            );
        }

        public void Update(string? name, int? age)
        {
            if (name == default)
                name = Name;

            if (age == default)
                age = Age;

            ValidateDomain(
                id: null,
                name: name,
                age: age.Value
            );
        }
        private void ValidateDomain(int? id, string name, int age)
        {
            if (id.HasValue)
            {
                DomainExceptionValidation.When(id <= 0,
                    "Campo Id inválido, menor ou igual á 0 não permitido");
                Id = id.Value;
            }

            DomainExceptionValidation.When(string.IsNullOrEmpty(name),
                "Campo nome obrigatório");

            DomainExceptionValidation.When(name.Length < 2,
                "Campo nome inválido, mínimo 2 carácteres");

            DomainExceptionValidation.When(name.Length > 200,
                "Campo nome inválido, máximo 200 carácteres");

            DomainExceptionValidation.When(age < 0,
                "Campo idade inválido, menor que 0 não permitido");

            DomainExceptionValidation.When(age > 120,
                "Campo idade inválido, maior que 120 não permitido");

            Name = name;
            Age = age;
        }

    }
}
