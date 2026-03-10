using TaskTracking.Core.DataAccess.Concrete.EntityFramework;
using TaskTracking.Core.Entities.Concrete;
using TaskTracking.DataAccess.Abstract;

namespace TaskTracking.DataAccess.Concrete.EntityFramework
{
    public class EfDepartmentDal : EfEntityRepositoryBase<Department, TaskTrackingContext>, IDepartmentDal
    {
        public EfDepartmentDal(TaskTrackingContext context) : base(context)
        {
        }
    }
}