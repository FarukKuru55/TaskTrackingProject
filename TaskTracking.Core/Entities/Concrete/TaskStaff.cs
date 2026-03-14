using TaskTracking.Core.Entities.Abstract;

namespace TaskTracking.Core.Entities.Concrete
{
    public class TaskStaff : IEntity
{
    public int Id { get; set; }
    public int TaskItemId { get; set; }
    public int StaffId { get; set; }

    public TaskItem TaskItem { get; set; }
    public Staff Staff { get; set; }  
}
}