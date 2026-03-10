using TaskTracking.Core.Entities.Abstract;

namespace TaskTracking.Core.Entities.Concrete
{
    public class TaskItem : IEntity
    {
        public int Id { get; set; }
        public int CompanyId { get; set; } // Bu görev hangi şirkete ait?
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty; // Biterken zorunlu olacak
        public string? DocumentUrl { get; set; } // Belge yolu (opsiyonel)
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime? CompletedDate { get; set; }
        public bool IsCompleted { get; set; } = false;
        public int PriorityId { get; set; }
        public int TaskStatusId { get; set; }
    }
}