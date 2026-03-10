using TaskTracking.Core.Entities.Abstract;

namespace TaskTracking.Core.Entities.Concrete
{
    public class Priority : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; } // Örn: Kritik
        public string ColorCode { get; set; } // Örn: #FF0000 (React'ta kırmızı yakacağız)
    }
}