using TaskTracking.Core.Entities.Abstract; 

namespace TaskTracking.Core.Entities.Concrete
{
    public class Company : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
    }
}