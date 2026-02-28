using maxiprod.Application.Interfaces;
using maxiprod.Application.Services;
using maxiprod.Domain.Interfaces;
using maxiprod.Infra.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

using Microsoft.Extensions.DependencyInjection;
using maxiprod.Infra.Data.Context;

namespace maxiprod.Infra.IoC
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfraestructure(
            this IServiceCollection services,
            IConfiguration config
        )
        {
            services.AddDbContext<ApplicationContext>(options =>
                options.UseNpgsql(config.GetConnectionString("DefaultConnection"),
                b => b.MigrationsAssembly(typeof(ApplicationContext).Assembly.FullName)
            ));

            // Mapper
            services.AddScoped<IMapperService, MapperService>();

            // Repositories
            services.AddScoped<IPersonRepository, PersonRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();

            // Services
            services.AddScoped<IPersonService, PersonService>();
            services.AddScoped<ICategoryService, CategoryService>();

            return services;
        }
    }
}
