using TaskTracking.Core.DataAccess.Concrete.EntityFramework;
using TaskTracking.Core.Entities.Concrete; 
using TaskTracking.DataAccess.Abstract;

namespace TaskTracking.DataAccess.Concrete.EntityFramework
{
    // Bu sınıf; Core'daki genel yapıyı kullanarak, Company tablosu için özelleşmiş veritabanı işlerini yapar.
    public class EfCompanyDal : EfEntityRepositoryBase<Company, TaskTrackingContext>, ICompanyDal
    {
        public EfCompanyDal(TaskTrackingContext context) : base(context)
        {
        }
    }
}