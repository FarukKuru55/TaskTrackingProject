using TaskTracking.Core.DataAccess.Abstract;

namespace TaskTracking.DataAccess.Abstract
{
    public interface ITaskStatusDal : IEntityRepository<TaskTracking.Core.Entities.Concrete.TaskStatus>
    {
    }
}