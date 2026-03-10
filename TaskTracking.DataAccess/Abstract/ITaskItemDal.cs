using TaskTracking.Core.DataAccess.Abstract;
using TaskTracking.Core.Entities.Concrete;
using TaskTracking.Core.DTOs.TaskItem;

namespace TaskTracking.DataAccess.Abstract
{
    public interface ITaskItemDal : IEntityRepository<TaskItem> 
    {
        List<TaskItemDetailDto> GetTaskDetails();
    }
}
