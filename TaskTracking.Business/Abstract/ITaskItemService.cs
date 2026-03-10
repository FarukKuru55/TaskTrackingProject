using TaskTracking.Core.Entities.Concrete;
using TaskTracking.Core.Utilities.Results;

namespace TaskTracking.Business.Abstract
{
    public interface ITaskItemService
    {
        IDataResult<List<TaskItem>> GetAll();
        IDataResult<TaskItem> GetById(int id);
        IResult Add(TaskItem taskItem);
        IResult Update(TaskItem taskItem);
        IResult Delete(TaskItem taskItem);

        // Senin özel istediğin görev bitirme kuralı için metodumuz:
        IResult CompleteTask(int taskId, int staffId, string description, string documentUrl);
    }
}