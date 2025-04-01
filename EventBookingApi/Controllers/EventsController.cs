using EventBookingApi.Data;
using EventBookingApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EventBookingApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly EventDbContext _context;

        public EventsController(EventDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
        {
            return await _context.Events.ToListAsync();
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Event>> CreateEvent(Event @event)
        {
            _context.Events.Add(@event);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEvents), new { id = @event.Id }, @event);
        }

        [HttpPost("book/{id}")]
        [Authorize]
        public async Task<IActionResult> BookEvent(int id)
        {
            var @event = await _context.Events.FindAsync(id);
            if (@event == null)
            {
                return NotFound();
            }

            if (@event.BookedSeats >= @event.Capacity)
            {
                return BadRequest("Tadbir to‘liq band qilingan!");
            }

            @event.BookedSeats++;
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var @event = await _context.Events.FindAsync(id);
            if (@event == null)
            {
                return NotFound();
            }

            _context.Events.Remove(@event);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("cancel/{id}")]
        [Authorize]
        public async Task<IActionResult> CancelBooking(int id)
        {
            var @event = await _context.Events.FindAsync(id);
            if (@event == null)
            {
                return NotFound();
            }

            if (@event.BookedSeats <= 0)
            {
                return BadRequest("Hech qanday joy band qilinmagan!");
            }

            @event.BookedSeats--;
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}