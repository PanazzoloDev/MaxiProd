namespace maxiprod.Application.DTOs
{
    public class ViewPersonDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
    }
    public class CreatePersonDTO
    {
        public string Name { get; set; }
        public int Age { get; set; }
    }
    public class UpdatePersonDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int? Age { get; set; }
    }
}
