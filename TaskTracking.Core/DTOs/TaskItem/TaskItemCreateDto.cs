using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskTracking.Core.DTOs.TaskItem
{
    public class TaskItemCreateDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public int CompanyId { get; set; }
        public int PriorityId { get; set; }
        public int TaskStatusId { get; set; }
    }
}
