using TaskTracking.Core.DataAccess.Concrete.EntityFramework;
using TaskTracking.Core.Entities.Concrete;
using TaskTracking.DataAccess.Abstract;

namespace TaskTracking.DataAccess.Concrete.EntityFramework
{
    public class EfTaskItemDal : EfEntityRepositoryBase<TaskItem, TaskTrackingContext>, ITaskItemDal
    {
        public EfTaskItemDal(TaskTrackingContext context) : base(context)
        {
        }
    }
}