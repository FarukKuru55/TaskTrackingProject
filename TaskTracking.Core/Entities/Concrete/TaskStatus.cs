using TaskTracking.Core.Entities.Abstract;

namespace TaskTracking.Core.Entities.Concrete
{
    public class TaskStatus : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ColorCode { get; set; }
    }
}