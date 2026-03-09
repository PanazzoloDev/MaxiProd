using maxiprod.Domain.Enums;
using maxiprod.Domain.Validations;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Linq;

namespace maxiprod.Domain.Entities
{
    [Table("Transactions")]
    public class Transaction : BaseEntity
    {
        [Required, MaxLength(400)]
        public string Description{ get; private set; }

        [Required, Range(0, double.MaxValue)]
        public double Amount { get; private set; }

        [Required]
        public TransactionTypeEnum Type { get; private set; }

        [Required]
        public int PersonId { get; private set; }
        
        [ForeignKey("PersonId")]
        public Person Person { get; set; }

        [Required]
        public int CategoryId { get; private set; }
        
        [ForeignKey("CategoryId")]
        public Category Category { get; set; }

        public Transaction(
            int id, 
            string description, 
            double amount,
            TransactionTypeEnum type, 
            int personId, 
            int categoryId)
        {
            ValidateDomain(
                id: id,
                description: description,
                amount: amount,
                type: type,
                personId: personId,
                categoryId: categoryId
            );

        }

        public Transaction(
            string description, 
            double amount, 
            TransactionTypeEnum type, 
            int personId, 
            int categoryId)
        {
            ValidateDomain(
                id: null,
                description: description,
                amount: amount,
                type: type,
                personId: personId,
                categoryId: categoryId
            );

        }

        public void Update(
            string? description,
            double? amount
        ){
            ValidateDomain(
                id: Id,
                description: description ?? Description,
                amount: amount ?? Amount,
                type: Type,
                personId: PersonId,
                categoryId: CategoryId
            );
        }

        private void ValidateDomain(
            int? id, 
            string description, 
            double amount,
            TransactionTypeEnum type, 
            int personId, 
            int categoryId
        )
        {
            if (id.HasValue)
            {
                DomainExceptionValidation.When(id <= 0,
                    "Campo Id inválido, menor ou igual á 0 não permitido");
                Id = id.Value;
            }

            DomainExceptionValidation.When(string.IsNullOrEmpty(description),
                "Campo descrição é obrigatório");

            DomainExceptionValidation.When(description.Length < 2 || description.Length > 400,
                "Campo descrição inválido, deve ser entre 2 e 400 carácteres");

            DomainExceptionValidation.When(amount < 0,
                "Campo Valor inválido, somente valores positivos são permitidos");

            DomainExceptionValidation.When(!Enum.IsDefined(typeof(TransactionTypeEnum), type),
                "Tipo de transação inválido/inexistente");

            DomainExceptionValidation.When(personId == default,
                "Campo Pessoa é obrigatório");

            DomainExceptionValidation.When(categoryId == default,
                "Campo Categoria é obrigatório");

            Description = description;
            Amount = amount;
            Type = type;
            PersonId = personId;
            CategoryId = categoryId;
        }
    }
}
