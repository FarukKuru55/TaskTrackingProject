using TaskTracking.Core.DataAccess.Concrete.EntityFramework;
using TaskTracking.Core.Entities.Concrete;
using TaskTracking.DataAccess.Abstract;

namespace TaskTracking.DataAccess.Concrete.EntityFramework
{
    public class EfTaskStaffDal : EfEntityRepositoryBase<TaskStaff, TaskTrackingContext>, ITaskStaffDal
    {
        public EfTaskStaffDal(TaskTrackingContext context) : base(context)
        {
        }
    }
}