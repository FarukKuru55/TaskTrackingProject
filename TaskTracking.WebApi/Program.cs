using Microsoft.EntityFrameworkCore;
using TaskTracking.Business.Abstract;
using TaskTracking.Business.Concrete;
using TaskTracking.DataAccess.Abstract;
using TaskTracking.DataAccess.Concrete.EntityFramework;

var builder = WebApplication.CreateBuilder(args);

// --- Servis Kayýtlarý (Dependency Injection) ---
builder.Services.AddScoped<ITaskItemService, TaskManager>();
builder.Services.AddScoped<ITaskItemDal, EfTaskItemDal>();
builder.Services.AddScoped<IStaffService, StaffManager>();
builder.Services.AddScoped<IStaffDal, EfStaffDal>();
builder.Services.AddScoped<ICompanyService, CompanyManager>();
builder.Services.AddScoped<ICompanyDal, EfCompanyDal>();
builder.Services.AddScoped<ITaskStaffService, TaskStaffManager>();
builder.Services.AddScoped<ITaskStaffDal, EfTaskStaffDal>();

// --- MySQL Veritabaný Baðlantýsý ---
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<TaskTrackingContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();