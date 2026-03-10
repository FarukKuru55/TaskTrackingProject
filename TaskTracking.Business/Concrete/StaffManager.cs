using TaskTracking.Core.Utilities.Results;
using TaskTracking.Business.Abstract;
using TaskTracking.Core.Entities.Concrete;
using TaskTracking.DataAccess.Abstract; 

namespace TaskTracking.Business.Concrete
{
    public class StaffManager : IStaffService
    {
        private readonly IStaffDal _staffDal;
        public StaffManager(IStaffDal staffDal) => _staffDal = staffDal;

        public IDataResult<List<Staff>> GetAll() =>
            new SuccessDataResult<List<Staff>>(_staffDal.GetAllAsync().GetAwaiter().GetResult());

        public IResult Add(Staff staff)
        {
            _staffDal.AddAsync(staff).GetAwaiter().GetResult();
            return new SuccessResult("Personel sisteme kaydedildi.");
        }

        public IResult Update(Staff staff)
        {
            _staffDal.Update(staff); // DataAccess katmanındaki Update'i çağırıyoruz
            return new SuccessResult("Personel bilgileri güncellendi.");
        }

        public IResult Delete(Staff staff)
        {
            _staffDal.Delete(staff); // DataAccess katmanındaki Delete'i çağırıyoruz
            return new SuccessResult("Personel sistemden silindi.");
        }
    }
}
