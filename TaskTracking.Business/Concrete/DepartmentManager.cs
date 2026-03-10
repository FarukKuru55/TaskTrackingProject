using TaskTracking.Business.Abstract;
using TaskTracking.Core.Entities.Concrete;
using TaskTracking.Core.Utilities.Results;
using TaskTracking.DataAccess.Abstract;

namespace TaskTracking.Business.Concrete
{
    public class DepartmentManager : IDepartmentService
    {
        private readonly IDepartmentDal _departmentDal;
        public DepartmentManager(IDepartmentDal departmentDal) => _departmentDal = departmentDal;

        public IDataResult<List<Department>> GetAll() =>
            new SuccessDataResult<List<Department>>(_departmentDal.GetAllAsync().GetAwaiter().GetResult());

        public IResult Add(Department department) { _departmentDal.AddAsync(department).GetAwaiter().GetResult(); return new SuccessResult("Departman eklendi."); }
        public IResult Update(Department department) { _departmentDal.Update(department); return new SuccessResult("Departman güncellendi."); }
        public IResult Delete(Department department) { _departmentDal.Delete(department); return new SuccessResult("Departman silindi."); }
    }
}