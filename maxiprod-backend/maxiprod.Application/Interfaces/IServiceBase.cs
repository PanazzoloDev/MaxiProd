using FluentResults;

namespace maxiprod.Application.Interfaces
{
    public interface IServiceBase<CreateDTO, UpdateDTO, ViewDTO>
    where CreateDTO : class
    where UpdateDTO : class
    where ViewDTO : class
    {
        Task<Result<IEnumerable<ViewDTO>>> GetAllAsync();
        Task<Result<IEnumerable<ViewDTO>>> GetPagedAsync(int pageNumber = 0, int pageSize = 50);
        Task<Result<ViewDTO>> GetByIdAsync(int id);
        Task<Result<ViewDTO>> CreateAsync(CreateDTO view);
        Task<Result<ViewDTO>> UpdateAsync(int id, UpdateDTO view);
        Task<Result<bool>> DeleteByIdAsync(int id);
    }
}
