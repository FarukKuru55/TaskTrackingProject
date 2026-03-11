using TaskTracking.Core.Entities.Abstract; 
 
namespace TaskTracking.Core.Entities.Concrete
{
    public class Department : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}