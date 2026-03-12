using System;
using System.Collections.Generic;

namespace TaskTracking.Core.DTOs.TaskItem
{
    public class TaskItemDetailDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public string PriorityName { get; set; }
        public string TaskStatusName { get; set; }
        public string CompanyName { get; set; }

        // ID'ler — güncelleme formunda lazım
        public int PriorityId { get; set; }
        public int TaskStatusId { get; set; }
        public int CompanyId { get; set; }

        // Atanan personel isimleri
        public List<string> AssignedStaffs { get; set; }

        // Atanan personel ID'leri
        public List<int> AssignedStaffIds { get; set; }
    }
}