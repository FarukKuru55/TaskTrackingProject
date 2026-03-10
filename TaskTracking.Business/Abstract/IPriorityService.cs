using TaskTracking.Core.Entities.Concrete;
using TaskTracking.Core.Utilities.Results;

namespace TaskTracking.Business.Abstract
{
    public interface IPriorityService
    {
        IDataResult<List<Priority>> GetAll();
        IResult Add(Priority priority);
        IResult Update(Priority priority);
        IResult Delete(Priority priority);
    }
}