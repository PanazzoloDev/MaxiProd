using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace maxiprod.Domain.Entities
{
    [Table("People")]
    public class Person : BaseEntity
    {
        [Required]
        [MaxLength(200, ErrorMessage = "O comprimento máximo é de 200 carateres")]
        [MinLength(5, ErrorMessage = "O comprimento mínimo é de 2 carateres")]
        public string Name { get; set; }

        [Required]
        [Range(0, 120, ErrorMessage = "A idade deve estar entre 0 e 120 anos")]
        public int Age { get; set; }
    }
}
