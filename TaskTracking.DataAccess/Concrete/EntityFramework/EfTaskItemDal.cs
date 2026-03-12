using TaskTracking.Core.DataAccess.Concrete.EntityFramework;
using TaskTracking.Core.Entities.Concrete;
using TaskTracking.DataAccess.Abstract;
using TaskTracking.Core.DTOs.TaskItem;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace TaskTracking.DataAccess.Concrete.EntityFramework
{
    public class EfTaskItemDal : EfEntityRepositoryBase<TaskItem, TaskTrackingContext>, ITaskItemDal
    {
        // 🚀 İsim çakışmasını önlemek için adını _dbContext yaptık (CS0108 uyarısı bitti)
        private readonly TaskTrackingContext _dbContext;

        public EfTaskItemDal(TaskTrackingContext context) : base(context)
        {
            _dbContext = context;
        }

        public List<TaskItemDetailDto> GetTaskDetails()
        {
            var rawTasks = _dbContext.TaskItems.ToList();
            var dtoList = new List<TaskItemDetailDto>();

            foreach (var task in rawTasks)
            {
                var dto = new TaskItemDetailDto();

                dto.Id = task.Id;
                dto.Title = task.Title ?? "Başlıksız";
                dto.Description = task.Description ?? "";

                // 🚀 DİKKAT: Veritabanında DueDate olmadığı için o eşleştirmeyi SİLDİK! (CS1061 hatası bitti)

                dto.PriorityId = task.PriorityId;
                dto.TaskStatusId = task.TaskStatusId;
                dto.CompanyId = task.CompanyId;

                var priority = _dbContext.Priorities.FirstOrDefault(p => p.Id == task.PriorityId);
                dto.PriorityName = priority != null ? priority.Name : "Belirsiz";

                var status = _dbContext.TaskStatuses.FirstOrDefault(s => s.Id == task.TaskStatusId);
                dto.TaskStatusName = status != null ? status.Name : "Beklemede";

                var company = _dbContext.Companies.FirstOrDefault(c => c.Id == task.CompanyId);
                dto.CompanyName = company != null ? company.Name : "Şirket Yok";

                dto.AssignedStaffIds = _dbContext.TaskStaffs
                                               .Where(ts => ts.TaskItemId == task.Id)
                                               .Select(ts => ts.StaffId)
                                               .ToList();

                dto.AssignedStaffs = (from ts in _dbContext.TaskStaffs
                                      join st in _dbContext.Staffs on ts.StaffId equals st.Id
                                      where ts.TaskItemId == task.Id
                                      select st.FirstName).ToList();

                dtoList.Add(dto);
            }

            return dtoList;
        }
    }
}