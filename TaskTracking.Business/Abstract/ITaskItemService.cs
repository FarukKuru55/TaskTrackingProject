using TaskTracking.Core.Entities.Concrete;
using TaskTracking.Core.Utilities.Results;
using TaskTracking.Core.DTOs.TaskItem; // DTO'ları ekledik

namespace TaskTracking.Business.Abstract
{
    public interface ITaskItemService
    {
        IDataResult<List<TaskItem>> GetAll();
        IDataResult<List<TaskItemDetailDto>> GetTaskDetails(); // Yazım hatası düzeltildi
        IDataResult<TaskItem> GetById(int id);
        IResult Add(TaskItemCreateDto taskItemCreateDto); // Noktalı virgül eklendi
        IResult Update(TaskItem taskItem);
        IResult Delete(TaskItem taskItem);
        IResult CompleteTask(int taskId, int staffId, string description, string documentUrl);
    }
}