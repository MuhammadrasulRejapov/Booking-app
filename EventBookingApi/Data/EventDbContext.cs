using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using EventBookingApi.Models;

namespace EventBookingApi.Data
{
    public class EventDbContext : IdentityDbContext<ApplicationUser>
    {
        public EventDbContext(DbContextOptions<EventDbContext> options) : base(options) { }

        public DbSet<Event> Events { get; set; }
    }
}