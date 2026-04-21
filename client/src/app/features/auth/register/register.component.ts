import { Component, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService, 
    private router: Router
  ){}

  errorMessage = signal(' ');
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

  register(): void{
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }
    this.errorMessage.set('');
    this.isSubmitting.set(true);

    const {email, password } = this.registerForm.getRawValue();


    this.auth.register({
      email: email || '',
      password: password || ''
    }).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(err?.error?.message || err?.message || 'Registration failed')
      }
    });
    
    
  }

}
