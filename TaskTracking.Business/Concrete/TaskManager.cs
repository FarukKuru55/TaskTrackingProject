using TaskTracking.Business.Abstract;
using TaskTracking.DataAccess.Abstract;
using TaskTracking.Core.Entities.Concrete;
using TaskTracking.Core.Utilities.Results;
using TaskTracking.Core.DTOs.TaskItem;

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
            var taskItem = new TaskItem
            {
                Title = dto.Title,
                Description = dto.Description,
                PriorityId = dto.PriorityId,
                TaskStatusId = dto.TaskStatusId,
                CreatedDate = DateTime.Now,
                IsCompleted = false
            };

            _taskItemDal.AddAsync(taskItem).GetAwaiter().GetResult();
            return new SuccessResult("Görev başarıyla oluşturuldu.");
        }

        public IDataResult<List<TaskItem>> GetAll()
        {
            var result = _taskItemDal.GetAllAsync().GetAwaiter().GetResult();
            return new SuccessDataResult<List<TaskItem>>(result, "Görevler listelendi.");
        }

        public IDataResult<List<TaskItemDetailDto>> GetTaskDetails()
        {
            var result = _taskItemDal.GetTaskDetails();
            return new SuccessDataResult<List<TaskItemDetailDto>>(result, "Görev detayları (Join) listelendi.");
        }

        public IDataResult<TaskItem> GetById(int id)
        {
            var result = _taskItemDal.GetByIdAsync(id).GetAwaiter().GetResult();
            return new SuccessDataResult<TaskItem>(result);
        }

        public IResult Update(TaskItem taskItem)
        {
            _taskItemDal.Update(taskItem);
            return new SuccessResult("Görev güncellendi.");
        }

        public IResult Delete(TaskItem taskItem)
        {
            _taskItemDal.Delete(taskItem);
            return new SuccessResult("Görev silindi.");
        }

        public IResult CompleteTask(int taskId, int staffId, string description, string documentUrl)
        {
            // 1. Görevi getir
            var task = _taskItemDal.GetByIdAsync(taskId).GetAwaiter().GetResult();
            if (task == null) return new ErrorResult("Görev bulunamadı!");

            // 2. Yetki Kontrolü
            var isStaffAssigned = CheckIfStaffAssignedToTask(taskId, staffId);
            if (!isStaffAssigned)
            {
                return new ErrorResult("Bu görevi bitirme yetkiniz yok! Görev size atanmamış.");
            }

            // 3. Zorunluluk Kontrolü
            if (string.IsNullOrEmpty(description) || description.Length < 10)
                return new ErrorResult("Açıklama en az 10 karakter olmalıdır!");

            if (string.IsNullOrEmpty(documentUrl))
                return new ErrorResult("Belge/Dosya yolu eklemek zorunludur!");

            // 4. Güncelleme
            task.Description = description;
            task.DocumentUrl = documentUrl;
            task.IsCompleted = true;
            task.CompletedDate = DateTime.Now;

            _taskItemDal.Update(task);
            return new SuccessResult("Görev başarıyla tamamlandı.");
        }

        // Yardımcı Metot: Atama kontrolü
        private bool CheckIfStaffAssignedToTask(int taskId, int staffId)
        {
            var result = _taskStaffDal.GetAllAsync(ts => ts.TaskItemId == taskId && ts.StaffId == staffId)
                                      .GetAwaiter().GetResult();
            return result.Any();
        }
    }
}