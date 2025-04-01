import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';
import { AuthService } from './auth.service';
import { Event } from './event';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
  styles: []
})
export class AppComponent implements OnInit {
  events: Event[] = [];
  newEvent: Event = { name: '', date: '', location: '', capacity: 0, bookedSeats: 0 };

  constructor(private eventService: EventService, public authService: AuthService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        console.log('Tadbirlar yuklandi:', data);
        this.events = data.map(event => ({
          ...event,
          isFullyBooked: event.bookedSeats >= event.capacity
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

  bookEvent(id: number) {
    this.eventService.bookEvent(id).subscribe({
      next: () => this.loadEvents(),
      error: (err) => console.error('Band qilishda xato:', err)
    });
  }
}