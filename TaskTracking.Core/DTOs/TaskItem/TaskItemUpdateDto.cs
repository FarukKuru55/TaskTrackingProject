using System;
using System.Collections.Generic;

namespace TaskTracking.Core.DTOs.TaskItem
{
    public class TaskItemUpdateDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int PriorityId { get; set; }
        public int TaskStatusId { get; set; }
        public int CompanyId { get; set; }
        public DateTime? DueDate { get; set; }
        public List<int> StaffIds { get; set; } 
    }
}