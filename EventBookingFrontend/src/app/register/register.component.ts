import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.register(this.username, this.password).subscribe({
      next: () => {
        console.log('Foydalanuvchi ro‘yxatdan o‘tdi');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.errorMessage = err.message || 'Ro‘yxatdan o‘tishda xato yuz berdi';
      }
    });
  }
}