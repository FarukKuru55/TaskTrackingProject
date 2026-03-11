using FluentValidation;
using TaskTracking.Core.DTOs.TaskItem;

namespace TaskTracking.Business.ValidationRules.FluentValidation
{
    public class TaskItemCreateValidator : AbstractValidator<TaskItemCreateDto>
    {
        public TaskItemCreateValidator()
        {
            RuleFor(t => t.Title).NotEmpty().WithMessage("Görev başlığı boş olamaz.");
            RuleFor(t => t.Title).MinimumLength(5).WithMessage("Görev başlığı en az 5 karakter olmalıdır.");

            RuleFor(t => t.Description).NotEmpty().WithMessage("Açıklama boş bırakılamaz.");
            RuleFor(t => t.Description).MaximumLength(500).WithMessage("Açıklama en fazla 500 karakter olabilir.");

            RuleFor(t => t.PriorityId).GreaterThan(0).WithMessage("Lütfen geçerli bir öncelik seçiniz.");
            RuleFor(t => t.TaskStatusId).GreaterThan(0).WithMessage("Lütfen geçerli bir görev durumu seçiniz.");

            // Tarih kuralı: Teslim tarihi bugünden sonra olmalı
            RuleFor(t => t.DueDate).GreaterThan(DateTime.Now).WithMessage("Teslim tarihi bugünden ileri bir tarih olmalıdır.");
        }
    }
}