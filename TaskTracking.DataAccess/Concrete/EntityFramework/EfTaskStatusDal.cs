using TaskTracking.Core.DataAccess.Concrete.EntityFramework;
using TaskTracking.DataAccess.Abstract;

namespace TaskTracking.DataAccess.Concrete.EntityFramework
{
    public class EfTaskStatusDal : EfEntityRepositoryBase<TaskTracking.Core.Entities.Concrete.TaskStatus, TaskTrackingContext>, ITaskStatusDal
    {
        public EfTaskStatusDal(TaskTrackingContext context) : base(context) { }
    }
}