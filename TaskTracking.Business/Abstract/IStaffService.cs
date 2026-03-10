using TaskTracking.Core.Utilities.Results;
using TaskTracking.Core.Entities.Concrete;
using TaskTracking.DataAccess.Abstract; 

namespace TaskTracking.Business.Abstract
{
    public interface IStaffService
    {
        IDataResult<List<Staff>> GetAll();
        IResult Add(Staff staff);
        IResult Update(Staff staff);
        IResult Delete(Staff staff);
    }
}
