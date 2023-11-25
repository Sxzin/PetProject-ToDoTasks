using Microsoft.EntityFrameworkCore;

namespace ToDoTasks.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<Models.Task> Tasks { get; set; }
    }
}
