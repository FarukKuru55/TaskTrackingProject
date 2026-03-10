using TaskTracking.Core.Utilities.Results;

namespace TaskTracking.Business.Abstract
{
    public interface ITaskStatusService
    {
        IDataResult<List<TaskTracking.Core.Entities.Concrete.TaskStatus>> GetAll();
        IResult Add(TaskTracking.Core.Entities.Concrete.TaskStatus taskStatus);
        IResult Update(TaskTracking.Core.Entities.Concrete.TaskStatus taskStatus);
        IResult Delete(TaskTracking.Core.Entities.Concrete.TaskStatus taskStatus);
    }
}