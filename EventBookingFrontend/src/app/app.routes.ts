import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'; // RegisterComponent import qilindi
import { EventsComponent } from './events/events.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, // Bu qator bo‘lishi kerak
  { path: 'events', component: EventsComponent },
];