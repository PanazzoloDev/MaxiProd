namespace maxiprod.Application.DTOs
{
    public class ViewTransactionDTO
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public double Amount { get; set; }
        public int Type { get; set; }
        public int PersonId { get; set; }
        public int CategoryId { get; set; }
    }
    public class CreateTransactionDTO
    {
        public string Description { get; set; }
        public double Amount { get; set; }
        public int Type { get; set; }
        public int PersonId { get; set; }
        public int CategoryId { get; set; }
    }
    public class UpdateTransactionDTO
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public double? Amount { get; set; }
        public int? Type { get; set; }
        public int? PersonId { get; set; }
        public int? CategoryId { get; set; }
    }
}
