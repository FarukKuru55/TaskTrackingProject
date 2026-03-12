using TaskTracking.Business.Abstract;
using TaskTracking.DataAccess.Abstract;
using TaskTracking.Core.Entities.Concrete;
using TaskTracking.Core.Utilities.Results;
using TaskTracking.Core.DTOs.TaskItem;
using TaskTracking.Business.ValidationRules.FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;

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

        // 🟢 GÖREV EKLEME (Personellerle Birlikte)
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
                CompanyId = dto.CompanyId, // Şirket ID'sini unutma şefim
                CreatedDate = DateTime.Now,
                IsCompleted = false
            };

            // 1. Önce Görevi Kaydet
            _taskItemDal.AddAsync(taskItem).GetAwaiter().GetResult();

            // 2. Eğer personel seçilmişse onları ara tabloya (TaskStaffs) ekle
            if (dto.StaffIds != null && dto.StaffIds.Any())
            {
                foreach (var staffId in dto.StaffIds)
                {
                    var taskStaff = new TaskStaff
                    {
                        TaskItemId = taskItem.Id,
                        StaffId = staffId
                    };
                    _taskStaffDal.AddAsync(taskStaff).GetAwaiter().GetResult();
                }
            }

            return new SuccessResult("Görev başarıyla oluşturuldu.");
        }

        // 🔵 GÖREV GÜNCELLEME (Tikleri Kaydeden Kısım Burası!)
        public IResult Update(TaskItemUpdateDto dto)
        {
            // 1. Veritabanındaki orijinal görevi bul
            var taskItem = _taskItemDal.GetByIdAsync(dto.Id).GetAwaiter().GetResult();
            if (taskItem == null) return new ErrorResult("Görev bulunamadı!");

            // 2. Temel verileri DTO'dan gelenlerle güncelle
            taskItem.Title = dto.Title;
            taskItem.Description = dto.Description;
            taskItem.PriorityId = dto.PriorityId;
            taskItem.TaskStatusId = dto.TaskStatusId;
            taskItem.CompanyId = dto.CompanyId;
            taskItem.DueDate = dto.DueDate;

            _taskItemDal.Update(taskItem);

            // 3. ÇOK KRİTİK: Önce bu göreve ait eski personelleri veritabanından temizle
            var existingStaffs = _taskStaffDal.GetAllAsync(ts => ts.TaskItemId == taskItem.Id).GetAwaiter().GetResult();
            foreach (var existingStaff in existingStaffs)
            {
                _taskStaffDal.Delete(existingStaff);
            }

            // 4. Şimdi checkbox'tan (DTO'dan) gelen yeni personelleri ekle
            if (dto.StaffIds != null && dto.StaffIds.Any())
            {
                foreach (var staffId in dto.StaffIds)
                {
                    var taskStaff = new TaskStaff
                    {
                        TaskItemId = taskItem.Id,
                        StaffId = staffId
                    };
                    _taskStaffDal.AddAsync(taskStaff).GetAwaiter().GetResult();
                }
            }

            return new SuccessResult("Görev başarıyla güncellendi.");
        }

        public IDataResult<List<TaskItem>> GetAll() =>
            new SuccessDataResult<List<TaskItem>>(_taskItemDal.GetAllAsync().GetAwaiter().GetResult());

        public IDataResult<List<TaskItemDetailDto>> GetTaskDetails() =>
            new SuccessDataResult<List<TaskItemDetailDto>>(_taskItemDal.GetTaskDetails());

        public IDataResult<TaskItem> GetById(int id) =>
            new SuccessDataResult<TaskItem>(_taskItemDal.GetByIdAsync(id).GetAwaiter().GetResult());

        public IResult Delete(TaskItem taskItem)
        {
           var linkedStaffs = _taskStaffDal.GetAllAsync(ts => ts.TaskItemId == taskItem.Id).GetAwaiter().GetResult();
            foreach (var staff in linkedStaffs)
            {
                _taskStaffDal.Delete(staff);
            }

            _taskItemDal.Delete(taskItem);
            return new SuccessResult("Görev ve bağlı personel kayıtları silindi.");
        }

        public IResult CompleteTask(int taskId, int staffId, string description, string documentUrl)
        {
            var task = _taskItemDal.GetByIdAsync(taskId).GetAwaiter().GetResult();
            if (task == null) return new ErrorResult("Görev bulunamadı!");

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