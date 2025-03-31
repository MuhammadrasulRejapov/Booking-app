import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { AuthService } from '../auth.service';
import { Event } from '../event';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: Event[] = [];
  newEvent: Event = { name: '', date: '', location: '', capacity: 0, bookedSeats: 0 };

  constructor(
    private eventService: EventService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.loadEvents();
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadEvents() {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        console.log('Tadbirlar yuklandi:', data);
        this.events = data.map(event => ({
          ...event,
          isFullyBooked: event.bookedSeats >= event.capacity,
          isExpired: new Date(event.date) < new Date()
        }));
      },
      error: (err) => console.error('Tadbirlar yuklanmadi:', err)
    });
  }

  onCreateEvent() {
    this.newEvent.date = new Date(this.newEvent.date).toISOString();
    this.eventService.createEvent(this.newEvent).subscribe({
      next: (response) => {
        console.log('Tadbir qo‘shildi:', response);
        this.loadEvents();
        this.newEvent = { name: '', date: '', location: '', capacity: 0, bookedSeats: 0 };
      },
      error: (err) => console.error('Tadbir qo‘shishda xato:', err)
    });
  }

  bookEvent(id?: number) {
    if (!id) {
      console.error('Tadbir ID topilmadi');
      return;
    }
    console.log('Band qilish so‘rovi yuborilmoqda, ID:', id);
    this.eventService.bookEvent(id).subscribe({
      next: () => {
        console.log('Tadbir muvaffaqiyatli band qilindi');
        this.loadEvents();
      },
      error: (err) => console.error('Band qilishda xato:', err)
    });
  }

  cancelBooking(id?: number) {
    if (!id) {
      console.error('Tadbir ID topilmadi');
      return;
    }
    if (confirm('Band qilingan joyni bekor qilishni xohlaysizmi?')) {
      this.eventService.cancelBooking(id).subscribe({
        next: () => {
          console.log('Band qilish bekor qilindi');
          this.loadEvents();
        },
        error: (err) => console.error('Band qilishni bekor qilishda xato:', err)
      });
    }
  }

  deleteEvent(id?: number) {
    if (!id) {
      console.error('Tadbir ID topilmadi');
      return;
    }
    if (confirm('Bu tadbirni o‘chirishni xohlaysizmi?')) {
      this.eventService.deleteEvent(id).subscribe({
        next: () => {
          console.log('Tadbir o‘chirildi');
          this.loadEvents();
        },
        error: (err) => console.error('Tadbir o‘chirishda xato:', err)
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}