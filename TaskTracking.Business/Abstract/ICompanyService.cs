using TaskTracking.Core.Entities.Concrete;
using TaskTracking.Core.Utilities.Results;

namespace TaskTracking.Business.Abstract
{
    public interface ICompanyService
    {
        IDataResult<List<Company>> GetAll();
        IResult Add(Company company);
        IResult Update(Company company);
        IResult Delete(Company company);
    }
}