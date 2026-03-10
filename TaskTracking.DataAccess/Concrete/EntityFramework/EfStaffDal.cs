using TaskTracking.Core.DataAccess.Concrete.EntityFramework;
using TaskTracking.Core.Entities.Concrete;
using TaskTracking.DataAccess.Abstract;

namespace TaskTracking.DataAccess.Concrete.EntityFramework
{
    public class EfStaffDal : EfEntityRepositoryBase<Staff, TaskTrackingContext>, IStaffDal
    {
        public EfStaffDal(TaskTrackingContext context) : base(context)
        {
        }
    }
}