import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  errorMessage = signal('');
  isSubmitting = signal(false);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  login(): void{
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }
    this.errorMessage.set('');
    this.isSubmitting.set(true);

    const {email, password } = this.loginForm.getRawValue();

    this.auth.login({
      email: email || '', 
      password: password || ''
    }).subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.router.navigate(['/dashboard'])
        },
        error: (err) => {
          this.isSubmitting.set(false);
          this.errorMessage.set(err?.error?.message || err?.message || 'Login failed')
        }
      });
    
  }

}
