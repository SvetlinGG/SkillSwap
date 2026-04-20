import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router){}

  register(){
    this.auth.register({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        console.log('REGISTER SUCCESS:', response);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('REGISTER ERROR', err);
        alert(err?.error?.message || err?.message || 'Registration failed')
      }
    });
    
    
  }

}
