using TaskTracking.Business.Abstract;
using TaskTracking.DataAccess.Abstract;
using TaskTracking.Core.Entities.Concrete;
using TaskTracking.Core.Utilities.Results;

namespace TaskTracking.Business.Concrete
{
    public class PriorityManager : IPriorityService
    {
        private readonly IPriorityDal _priorityDal;
        public PriorityManager(IPriorityDal priorityDal) => _priorityDal = priorityDal;

        public IDataResult<List<Priority>> GetAll() =>
            new SuccessDataResult<List<Priority>>(_priorityDal.GetAllAsync().GetAwaiter().GetResult());

        public IResult Add(Priority priority)
        {
            _priorityDal.AddAsync(priority).GetAwaiter().GetResult();
            return new SuccessResult("Öncelik eklendi.");
        }
    }
}