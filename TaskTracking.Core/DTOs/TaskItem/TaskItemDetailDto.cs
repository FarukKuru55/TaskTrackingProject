using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskTracking.Core.DTOs.TaskItem
{
    public class TaskItemDetailDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }

        // ID yerine isim dönüyoruz
        public string PriorityName { get; set; }    // "Yüksek"
        public string TaskStatusName { get; set; }  // "Beklemede"
        public string CompanyName { get; set; }

        // Atanan personeller
        public List<string> AssignedStaffs { get; set; }
    }
}
