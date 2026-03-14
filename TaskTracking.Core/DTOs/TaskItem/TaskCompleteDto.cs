using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskTracking.Core.DTOs.TaskItem
{
    public class TaskCompleteDto
    {
        public int TaskId { get; set; }
        public int StaffId { get; set; }
        public string Description { get; set; } = string.Empty; // Hata vermemesi için varsayılan değer
        public string? DocumentUrl { get; set; } 
    }
}