using Microsoft.EntityFrameworkCore;
using TaskTracking.Core.Entities.Concrete;

namespace TaskTracking.DataAccess.Concrete.EntityFramework
{
    public class TaskTrackingContext : DbContext
    {
        public TaskTrackingContext(DbContextOptions<TaskTrackingContext> options) : base(options)
        {
        }

        // Veritabanındaki tablolarımızın karşılığı
        public DbSet<TaskItem> TaskItems { get; set; }
        public DbSet<Staff> Staffs { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<TaskStaff> TaskStaffs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // İleride Many-to-Many ilişkileri burada detaylandırabiliriz
            base.OnModelCreating(modelBuilder);
        }
    }
}