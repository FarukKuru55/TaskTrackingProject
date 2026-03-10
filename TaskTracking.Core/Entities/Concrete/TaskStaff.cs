using TaskTracking.Core.Entities.Abstract;

namespace TaskTracking.Core.Entities.Concrete
{
    public class TaskStaff : IEntity
    {
        public int Id { get; set; }
        public int TaskItemId { get; set; }
        public int StaffId { get; set; }
    }
}