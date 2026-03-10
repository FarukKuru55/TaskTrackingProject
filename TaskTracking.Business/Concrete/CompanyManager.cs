using TaskTracking.Business.Abstract;
using TaskTracking.DataAccess.Abstract;
using TaskTracking.Core.Entities.Concrete;
using TaskTracking.Core.Utilities.Results;

namespace TaskTracking.Business.Concrete
{
    public class CompanyManager : ICompanyService
    {
        private readonly ICompanyDal _companyDal;
        public CompanyManager(ICompanyDal companyDal) => _companyDal = companyDal;

        public IDataResult<List<Company>> GetAll() =>
            new SuccessDataResult<List<Company>>(_companyDal.GetAllAsync().GetAwaiter().GetResult());

        public IResult Add(Company company) { _companyDal.AddAsync(company).GetAwaiter().GetResult(); return new SuccessResult("Şirket eklendi."); }
        public IResult Update(Company company) { _companyDal.Update(company); return new SuccessResult("Şirket güncellendi."); }
        public IResult Delete(Company company) { _companyDal.Delete(company); return new SuccessResult("Şirket silindi."); }
    }
}