using TaskTracking.Business.Abstract;
using TaskTracking.Core.Utilities.Results;
using TaskTracking.DataAccess.Abstract;

namespace TaskTracking.Business.Concrete
{
    public class TaskStatusManager : ITaskStatusService
    {
        private readonly ITaskStatusDal _taskStatusDal;
        public TaskStatusManager(ITaskStatusDal taskStatusDal) => _taskStatusDal = taskStatusDal;

        public IDataResult<List<TaskTracking.Core.Entities.Concrete.TaskStatus>> GetAll() =>
            new SuccessDataResult<List<TaskTracking.Core.Entities.Concrete.TaskStatus>>(_taskStatusDal.GetAllAsync().GetAwaiter().GetResult());

        public IResult Add(TaskTracking.Core.Entities.Concrete.TaskStatus taskStatus) { _taskStatusDal.AddAsync(taskStatus).GetAwaiter().GetResult(); return new SuccessResult("Durum eklendi."); }
        public IResult Update(TaskTracking.Core.Entities.Concrete.TaskStatus taskStatus) { _taskStatusDal.Update(taskStatus); return new SuccessResult("Durum güncellendi."); }
        public IResult Delete(TaskTracking.Core.Entities.Concrete.TaskStatus taskStatus) { _taskStatusDal.Delete(taskStatus); return new SuccessResult("Durum silindi."); }
    }
}