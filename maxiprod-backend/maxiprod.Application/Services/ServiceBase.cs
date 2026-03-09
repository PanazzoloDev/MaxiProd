using AutoMapper;
using FluentResults;
using maxiprod.Application.Interfaces;
using maxiprod.Domain.Interfaces;

namespace maxiprod.Application.Services
{
    public abstract class ServiceBase<Entity, CreateDTO, UpdateDTO, ViewDTO> : IServiceBase<CreateDTO, UpdateDTO, ViewDTO>
        where Entity : class
        where CreateDTO : class
        where UpdateDTO : class
        where ViewDTO : class
    {
        protected readonly IRepositoryBase<Entity> _repository;
        protected readonly IMapper _mapper;

        public ServiceBase(IRepositoryBase<Entity> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        //public virtual async Task<Result<IEnumerable<ViewDTO>>> GetAllAsync()
        //{
        //    try
        //    {
        //        var models = _repository.GetAll().ToListAsync;
        //        var views = models.Select(x => _mapper.Map<Entity, ViewDTO>(x));
        //        return Result.Ok(views);
        //    }
        //    catch (Exception ex)
        //    {
        //        return Result.Fail(ex.Message);
        //    }
        //}

        public virtual async Task<Result<ViewDTO>> GetByIdAsync(int id)
        {
            try 
            { 
                var model = await _repository.GetByIdAsync(id);
                if (model == null)
                    return Result.Fail("Registro não encontrado.");

                return Result.Ok(_mapper.Map<Entity, ViewDTO>(model));
            }
            catch (Exception ex)
            {
                return Result.Fail(ex.Message);
            }
        }

        public virtual async Task<Result<ViewDTO>> CreateAsync(CreateDTO view)
        {
            try { 
                var model = _mapper.Map<CreateDTO, Entity>(view);
                await _repository.CreateAsync(model);
                return Result.Ok(_mapper.Map<Entity, ViewDTO>(model));
            }
            catch (Exception ex)
            {
                return Result.Fail(ex.Message);
            }
        }

        /// <summary>
        /// Método abstrato, cada service deve implementar a 
        /// atualização de acordo com suas regras de negócio de cada dominio
        /// </summary>
        /// <param name="id"></param>
        /// <param name="view"></param>
        /// <returns></returns>
        public abstract Task<Result<ViewDTO>> UpdateAsync(int id, UpdateDTO view);

        public virtual async Task<Result<bool>> DeleteByIdAsync(int id)
        {
            try
            {
                var model = await _repository.GetByIdAsync(id);
                if (model == null)
                    return Result.Fail("Registro não encontrado.");

                await _repository.DeleteAsync(model);
                return Result.Ok();
            }
            catch (Exception ex)
            {
                return Result.Fail(ex.Message);
            }
        }

        public virtual async Task<Result<IEnumerable<ViewDTO>>> GetPagedAsync(int pageNumber = 0, int pageSize = 50)
        {
            try
            {
                var models = await _repository.GetPagedAsync(pageNumber, pageSize);
                var views = models.Select(x => _mapper.Map<Entity, ViewDTO>(x));
                return Result.Ok(views);
            }
            catch (Exception ex)
            {
                return Result.Fail(ex.Message);
            }
        }
    }
}
