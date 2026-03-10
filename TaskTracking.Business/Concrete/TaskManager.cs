using TaskTracking.Business.Abstract;
using TaskTracking.DataAccess.Abstract;
using TaskTracking.Core.Entities.Concrete;
using TaskTracking.Core.Utilities.Results;

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

        public IResult Add(TaskItem taskItem)
        {
            _taskItemDal.AddAsync(taskItem).GetAwaiter().GetResult();
            return new SuccessResult("Görev başarıyla eklendi.");
        }

        public IDataResult<List<TaskItem>> GetAll()
        {
            return new SuccessDataResult<List<TaskItem>>(_taskItemDal.GetAllAsync().GetAwaiter().GetResult(), "Görevler listelendi.");
        }

        public IDataResult<TaskItem> GetById(int id)
        {
            return new SuccessDataResult<TaskItem>(_taskItemDal.GetByIdAsync(id).GetAwaiter().GetResult());
        }

        public IResult CompleteTask(int taskId, int staffId, string description, string documentUrl)
        {
            // 1. Görevi veritabanından getir
            var task = _taskItemDal.GetByIdAsync(taskId).GetAwaiter().GetResult();
            if (task == null) return new ErrorResult("Görev bulunamadı!");

            // 2. YETKİ KONTROLÜ: Bu personel bu göreve atanmış mı?
            var isStaffAssigned = CheckIfStaffAssignedToTask(taskId, staffId);
            if (!isStaffAssigned)
            {
                return new ErrorResult("Bu görevi bitirme yetkiniz yok! Sadece atanan personeller bitirebilir.");
            }

            // 3. ZORUNLULUK KONTROLÜ (Açıklama ve Belge kuralı)
            if (string.IsNullOrEmpty(description) || description.Length < 10)
                return new ErrorResult("Görev biterken en az 10 karakterlik açıklama zorunludur!");

            if (string.IsNullOrEmpty(documentUrl))
                return new ErrorResult("Görev biterken belge (dosya yolu) eklemek zorunludur!");

            // 4. GÖREVİ TAMAMLA
            task.Description = description;
            task.DocumentUrl = documentUrl;
            task.IsCompleted = true;
            task.CompletedDate = DateTime.Now;

            _taskItemDal.Update(task);
            return new SuccessResult("Görev personeli tarafından başarıyla tamamlandı.");
        }

        // Yardımcı Metot: Atama kontrolünü veritabanından yapar
        private bool CheckIfStaffAssignedToTask(int taskId, int staffId)
        {
            var result = _taskStaffDal.GetAllAsync(ts => ts.TaskItemId == taskId && ts.StaffId == staffId)
                                      .GetAwaiter().GetResult();
            return result.Any();
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
    }
}