using TaskTracking.Core.DataAccess.Concrete.EntityFramework;
using TaskTracking.Core.Entities.Concrete;
using TaskTracking.DataAccess.Abstract;

namespace TaskTracking.DataAccess.Concrete.EntityFramework
{
    public class EfPriorityDal : EfEntityRepositoryBase<Priority, TaskTrackingContext>, IPriorityDal
    {
        public EfPriorityDal(TaskTrackingContext context) : base(context) { }
    }
}