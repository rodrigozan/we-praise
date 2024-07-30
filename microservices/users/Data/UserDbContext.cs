using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Data
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=localhost,1433;Database=db_wepraise;UserId=sa;Password=Acti001@2024;");
        }
    }
}
