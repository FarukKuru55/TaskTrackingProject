using TaskTracking.Core.DataAccess.Concrete.EntityFramework;
using TaskTracking.Core.Entities.Concrete;
using TaskTracking.DataAccess.Abstract;
using TaskTracking.Core.DTOs.TaskItem;

namespace TaskTracking.DataAccess.Concrete.EntityFramework
{
    public class EfTaskItemDal : EfEntityRepositoryBase<TaskItem, TaskTrackingContext>, ITaskItemDal
    {
        // Constructor burada kalmalı
        public EfTaskItemDal(TaskTrackingContext context) : base(context) { }

        public List<TaskItemDetailDto> GetTaskDetails()
        {
            var result = from t in _context.TaskItems
                         join p in _context.Priorities on t.PriorityId equals p.Id
                         join s in _context.TaskStatuses on t.TaskStatusId equals s.Id
                         select new TaskItemDetailDto
                         {
                             Id = t.Id,
                             Title = t.Title,
                             Description = t.Description,
                             PriorityName = p.Name,
                             TaskStatusName = s.Name
                         };
            return result.ToList();
        }
    }
}