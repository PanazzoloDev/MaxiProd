using maxiprod.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace maxiprod.Domain.Entities
{
    [Table("Categories")]
    public class Category : BaseEntity
    {
        [Required]
        [MaxLength(400, ErrorMessage = "O comprimento máximo é de 400 carateres")]
        [MinLength(5, ErrorMessage = "O comprimento mínimo é de 2 carateres")]
        public string Name { get; set; }

        [Required]
        public PurposeEnum Purpose { get; set; }
    }
}
