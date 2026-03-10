using TaskTracking.Business.Abstract;
using TaskTracking.DataAccess.Abstract;
using TaskTracking.Core.Entities.Concrete;
using TaskTracking.Core.Utilities.Results;

namespace TaskTracking.Business.Concrete
{
    public class TaskStaffManager : ITaskStaffService
    {
        private readonly ITaskStaffDal _taskStaffDal;
        public TaskStaffManager(ITaskStaffDal taskStaffDal) => _taskStaffDal = taskStaffDal;

        public IResult AssignStaffToTask(TaskStaff taskStaff)
        {
            _taskStaffDal.AddAsync(taskStaff).GetAwaiter().GetResult();
            return new SuccessResult("Personel göreve başarıyla atandı.");
        }

        public IResult RemoveStaffFromTask(int taskStaffId)
        {
            var result = _taskStaffDal.GetByIdAsync(taskStaffId).GetAwaiter().GetResult();
            if (result == null) return new ErrorResult("Atama bulunamadı.");
            _taskStaffDal.Delete(result);
            return new SuccessResult("Personelin görev ataması kaldırıldı.");
        }

        public IDataResult<List<Staff>> GetStaffsByTaskId(int taskId)
        {
            return new SuccessDataResult<List<Staff>>(new List<Staff>(), "Görev personelleri listelendi.");
        }
    }
}