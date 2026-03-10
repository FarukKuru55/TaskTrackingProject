using FluentValidation;
using TaskTracking.Core.Entities.Concrete;

namespace TaskTracking.Business.ValidationRules
{
    public class TaskItemValidator : AbstractValidator<TaskItem>
    {
        public TaskItemValidator()
        {
            // Temel kurallar
            RuleFor(t => t.Title).NotEmpty().WithMessage("Görev başlığı boş olamaz.");

            // Görev tamamlanırken devreye girecek özel kural seti
            RuleSet("Complete", () => 
            {
                RuleFor(t => t.Description)
                    .NotEmpty().WithMessage("Görev tamamlanırken açıklama zorunludur.")
                    .MinimumLength(10).WithMessage("Açıklama en az 10 karakter olmalıdır.");

                RuleFor(t => t.DocumentUrl)
                    .NotEmpty().WithMessage("Görev tamamlanırken belge yolu eklemek zorunludur.");
            });
        }
    }
}