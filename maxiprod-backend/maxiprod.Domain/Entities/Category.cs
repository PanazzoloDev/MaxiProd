using maxiprod.Domain.Enums;
using maxiprod.Domain.Validations;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace maxiprod.Domain.Entities
{
    [Table("Categories")]
    public class Category : BaseEntity
    {
        [Required,MaxLength(400),MinLength(5)]
        public string Description { get; private set; }

        [Required]
        public PurposeEnum Purpose { get; private set; }

        public Category(int id, string description, PurposeEnum purpose)
        {
            ValidateDomain(description, purpose, id);
        }
        public Category(string description, PurposeEnum purpose)
        {
            ValidateDomain(description, purpose);
        }

        private void ValidateDomain(string description, PurposeEnum purpose, int? id = null)
        {
            if (id.HasValue)
            {
                DomainExceptionValidation.When(id <= 0,
                    "Campo Id inválido, menor ou igual á 0 não permitido");
                Id = id.Value;
            }

            DomainExceptionValidation.When(string.IsNullOrEmpty(description),
                "Campo Descrição inválido, obrigatório");

            DomainExceptionValidation.When(description.Length < 2,
                "Campo Descrição inválido, mínimo 2 carácteres");

            DomainExceptionValidation.When(description.Length > 400,
                "Campo Descrição inválido, máximo 400 carácteres");

            DomainExceptionValidation.When(!Enum.IsDefined(typeof(PurposeEnum), purpose),
                "Campo Finalidade inválido.");

            Description = description;
            Purpose = purpose;
        }

        public void Update(string description)
        {
            ValidateDomain(description, Purpose);
        }
    }
}
