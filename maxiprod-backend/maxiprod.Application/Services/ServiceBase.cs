using FluentResults;
using maxiprod.Application.Interfaces;
using maxiprod.Domain.Interfaces;

namespace maxiprod.Application.Services
{
    public class ServiceBase<Entity, CreateDTO, UpdateDTO, ViewDTO> : IServiceBase<CreateDTO, UpdateDTO, ViewDTO>
        where Entity : class, new()
        where CreateDTO : class, new()
        where UpdateDTO : class, new()
        where ViewDTO : class, new()
    {
        protected readonly IRepositoryBase<Entity> _repository;
        protected readonly IMapperService _mapper;

        public ServiceBase(IRepositoryBase<Entity> repository, IMapperService mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<Result<IEnumerable<ViewDTO>>> GetAllAsync()
        {
            var models = await _repository.GetAllAsync();
            var views = models.Select(x => _mapper.Map<Entity, ViewDTO>(x));
            return Result.Ok(views);
        }

        public async Task<Result<ViewDTO>> GetByIdAsync(int id)
        {
            var model = await _repository.GetByIdAsync(id);
            if (model == null)
                return Result.Fail("Registro não encontrado.");

            return Result.Ok(_mapper.Map<Entity, ViewDTO>(model));
        }

        public async Task<Result<ViewDTO>> CreateAsync(CreateDTO view)
        {
            var model = _mapper.Map<CreateDTO, Entity>(view);
            await _repository.CreateAsync(model);
            return Result.Ok(_mapper.Map<Entity, ViewDTO>(model));
        }

        public async Task<Result<ViewDTO>> UpdateAsync(int id, UpdateDTO view)
        {
            var model = await _repository.GetByIdAsync(id);
            if (model == null)
                return Result.Fail("Registro não encontrado.");

            _mapper.Map(view, model);
            await _repository.UpdateAsync(model);
            return Result.Ok(_mapper.Map<Entity, ViewDTO>(model));
        }

        public async Task<Result<bool>> DeleteByIdAsync(int id)
        {
            var model = await _repository.GetByIdAsync(id);
            if (model == null)
                return Result.Fail("Registro não encontrado.");

            await _repository.DeleteAsync(model);
            return Result.Ok();
        }

        public async Task<Result<IEnumerable<ViewDTO>>> GetPagedAsync(int pageNumber = 0, int pageSize = 50)
        {
            var models = await _repository.GetPagedAsync(pageNumber, pageSize);
            var views = models.Select(x => _mapper.Map<Entity, ViewDTO>(x));
            return Result.Ok(views);
        }
    }
}
