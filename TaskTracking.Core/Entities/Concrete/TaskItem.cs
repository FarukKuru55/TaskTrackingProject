using TaskTracking.Core.Entities.Abstract;

namespace TaskTracking.Core.Entities.Concrete
{
    public class TaskItem : IEntity
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? DocumentUrl { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime? CompletedDate { get; set; }
        public DateTime? DueDate { get; set; }
        public bool IsCompleted { get; set; } = false;
        public int PriorityId { get; set; }
        public int TaskStatusId { get; set; }
        public int CompanyId { get; set; }

        public Priority Priority { get; set; }
        public TaskStatus TaskStatus { get; set; }
        public Company Company { get; set; }
        public ICollection<TaskStaff> TaskStaffs { get; set; }
    }
}