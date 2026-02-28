namespace maxiprod.Application.DTOs
{
    public class ViewCategoryDTO
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int Type { get; set; }
    }
    public class CreateCategoryDTO
    {
        public string Description { get; set; }
        public int Type { get; set; }
    }
    public class UpdateCategoryDTO
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public int? Type { get; set; }
    }
}
