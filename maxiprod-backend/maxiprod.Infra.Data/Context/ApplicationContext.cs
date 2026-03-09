using maxiprod.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace maxiprod.Infra.Data.Context
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options){}

        public DbSet<Category> Categories { get; set; }
        public DbSet<Person> Peoples { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Category>();
            modelBuilder.Entity<Person>();
            modelBuilder.Entity<Transaction>();
            //modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppContext).Assembly);
        }
    }
}
