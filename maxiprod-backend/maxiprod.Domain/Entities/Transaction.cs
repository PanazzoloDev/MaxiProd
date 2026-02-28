using maxiprod.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace maxiprod.Domain.Entities
{
    [Table("Transactions")]
    public class Transaction : BaseEntity
    {
        [Required]
        [MaxLength(400, ErrorMessage = "O comprimento máximo é de 400 carateres")]
        public string Description{ get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Não são permitidos valores negativos")]
        public double Amount { get; set; }

        [Required]
        public TransactionTypeEnum Type { get; set; }
        [Required]
        public int PersonId { get; set; }
        
        [ForeignKey("PersonId")]
        public Person Person { get; set; }
        [Required]
        public int CategoryId { get; set; }
        
        [ForeignKey("CategoryId")]
        public Category Category { get; set; }

    }
}
