using System.ComponentModel.DataAnnotations;

namespace EventBookingApi.Models
{
    public class Event
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Tadbir nomi kiritilishi shart")]
        public string? Name { get; set; }

        public DateTime Date { get; set; }

        [Required(ErrorMessage = "Joylashuv kiritilishi shart")]
        public string? Location { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "O‘rinlar soni 1 dan katta bo‘lishi kerak")]
        public int Capacity { get; set; }

        public int BookedSeats { get; set; }
        public bool IsFullyBooked => BookedSeats >= Capacity;
    }
}