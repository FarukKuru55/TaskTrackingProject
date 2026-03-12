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
        public DbSet<Priority> Priorities { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<TaskTracking.Core.Entities.Concrete.TaskStatus> TaskStatuses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // 🚀 TÜM TABLOLARI KÜÇÜK HARFE ZORLA (MySQL hassasiyeti için)
            modelBuilder.Entity<TaskItem>().ToTable("taskitems");
            modelBuilder.Entity<Staff>().ToTable("staffs");
            modelBuilder.Entity<Company>().ToTable("companies");
            modelBuilder.Entity<TaskStaff>().ToTable("taskstaffs");
            modelBuilder.Entity<Priority>().ToTable("priorities");
            modelBuilder.Entity<Department>().ToTable("departments");
            modelBuilder.Entity<TaskTracking.Core.Entities.Concrete.TaskStatus>().ToTable("taskstatuses");
        }
    }
}