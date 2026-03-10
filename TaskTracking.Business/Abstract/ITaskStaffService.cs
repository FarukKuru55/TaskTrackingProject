using TaskTracking.Core.Entities.Concrete;
using TaskTracking.Core.Utilities.Results;

namespace TaskTracking.Business.Abstract
{
    public interface ITaskStaffService
    {
        IResult AssignStaffToTask(TaskStaff taskStaff); // Personeli göreve ata
        IResult RemoveStaffFromTask(int taskStaffId); // Atamayı kaldır
        IDataResult<List<Staff>> GetStaffsByTaskId(int taskId); // Bir görevdeki personelleri getir
    }
}