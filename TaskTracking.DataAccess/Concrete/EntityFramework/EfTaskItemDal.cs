using TaskTracking.Core.DataAccess.Concrete.EntityFramework;
using TaskTracking.Core.Entities.Concrete;
using TaskTracking.DataAccess.Abstract;
using TaskTracking.Core.DTOs.TaskItem;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System;

namespace TaskTracking.DataAccess.Concrete.EntityFramework
{
    public class EfTaskItemDal : EfEntityRepositoryBase<TaskItem, TaskTrackingContext>, ITaskItemDal
    {
        private readonly TaskTrackingContext _context;

        public EfTaskItemDal(TaskTrackingContext context) : base(context)
        {
            // 🚀 ATAMA BURADA OLMALI!
            _context = context;
        }

        public List<TaskItemDetailDto> GetTaskDetails()
        {
            return _context.TaskItems
                .AsNoTracking()
                .Select(t => new TaskItemDetailDto
                {
                    Id = t.Id,
                    Title = t.Title ?? "",
                    Description = t.Description ?? "",
                    DueDate = t.DueDate,
                    PriorityId = t.PriorityId,
                    PriorityName = _context.Priorities.FirstOrDefault(p => p.Id == t.PriorityId).Name ?? "Belirsiz",
                    TaskStatusId = t.TaskStatusId,
                    TaskStatusName = _context.TaskStatuses.FirstOrDefault(s => s.Id == t.TaskStatusId).Name ?? "Beklemede",
                    CompanyId = t.CompanyId,
                    DocumentUrl = t.DocumentUrl,
                    CompanyName = _context.Companies.FirstOrDefault(c => c.Id == t.CompanyId).Name ?? "Şirket Yok",

                    AssignedStaffIds = _context.TaskStaffs
                        .Where(ts => ts.TaskItemId == t.Id)
                        .Select(ts => ts.StaffId).ToList(),

                    AssignedStaffs = (from ts in _context.TaskStaffs
                                      join st in _context.Staffs on ts.StaffId equals st.Id
                                      where ts.TaskItemId == t.Id
                                      select st.FirstName).ToList()
                }).ToList();
        }
    }
}