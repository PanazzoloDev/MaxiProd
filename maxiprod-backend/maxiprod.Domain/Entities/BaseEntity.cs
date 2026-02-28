using System.ComponentModel.DataAnnotations;

namespace maxiprod.Domain.Entities
{
    public class BaseEntity
    {
        [Key, Required]
        public int Id { get; set; }
    }
}
