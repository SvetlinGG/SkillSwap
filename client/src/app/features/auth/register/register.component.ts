import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private auth = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  errorMessage = signal('');
  isSubmitting = signal(false);

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  get email(){
    return this.registerForm.get('email');
  }

  get password(){
    return this.registerForm.get('password');
  }

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
