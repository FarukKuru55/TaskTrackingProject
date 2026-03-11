using TaskTracking.Business.Abstract;
using TaskTracking.DataAccess.Abstract;
using TaskTracking.Core.Entities.Concrete;
using TaskTracking.Core.Utilities.Results;
using TaskTracking.Core.DTOs.TaskItem;
using TaskTracking.Business.ValidationRules.FluentValidation; // Using burada olmalı

namespace TaskTracking.Business.Concrete
{
    public class TaskManager : ITaskItemService
    {
        private readonly ITaskItemDal _taskItemDal;
        private readonly ITaskStaffDal _taskStaffDal;

        public TaskManager(ITaskItemDal taskItemDal, ITaskStaffDal taskStaffDal)
        {
            _taskItemDal = taskItemDal;
            _taskStaffDal = taskStaffDal;
        }

        public IResult Add(TaskItemCreateDto dto)
        {
            var validator = new TaskItemCreateValidator();
            var result = validator.Validate(dto);
            if (!result.IsValid) return new ErrorResult(result.Errors[0].ErrorMessage);

            var taskItem = new TaskItem
            {
                Title = dto.Title,
                Description = dto.Description,
                PriorityId = dto.PriorityId,
                TaskStatusId = dto.TaskStatusId,
                CreatedDate = DateTime.Now,
                IsCompleted = false
            };

            _taskItemDal.AddAsync(taskItem).GetAwaiter().GetResult(); // Buradaki ; 'e dikkat!
            return new SuccessResult("Görev başarıyla oluşturuldu.");
        }

        public IDataResult<List<TaskItem>> GetAll() =>
            new SuccessDataResult<List<TaskItem>>(_taskItemDal.GetAllAsync().GetAwaiter().GetResult());

        public IDataResult<List<TaskItemDetailDto>> GetTaskDetails() =>
            new SuccessDataResult<List<TaskItemDetailDto>>(_taskItemDal.GetTaskDetails());

        public IDataResult<TaskItem> GetById(int id) =>
            new SuccessDataResult<TaskItem>(_taskItemDal.GetByIdAsync(id).GetAwaiter().GetResult());

        public IResult Update(TaskItem taskItem)
        {
            _taskItemDal.Update(taskItem);
            return new SuccessResult("Güncellendi.");
        }

        public IResult Delete(TaskItem taskItem)
        {
            _taskItemDal.Delete(taskItem);
            return new SuccessResult("Silindi.");
        }

        public IResult CompleteTask(int taskId, int staffId, string description, string documentUrl)
        {
            var task = _taskItemDal.GetByIdAsync(taskId).GetAwaiter().GetResult();
            if (task == null) return new ErrorResult("Görev bulunamadı!");

            // CheckIfStaffAssignedToTask kullanımı
            if (!CheckIfStaffAssignedToTask(taskId, staffId)) return new ErrorResult("Yetkisiz işlem!");

            task.Description = description;
            task.DocumentUrl = documentUrl;
            task.IsCompleted = true;
            task.CompletedDate = DateTime.Now;

            _taskItemDal.Update(task);
            return new SuccessResult("Görev tamamlandı.");
        }

        private bool CheckIfStaffAssignedToTask(int taskId, int staffId)
        {
            var result = _taskStaffDal.GetAllAsync(ts => ts.TaskItemId == taskId && ts.StaffId == staffId).GetAwaiter().GetResult();
            return result.Any();
        }
    }
}