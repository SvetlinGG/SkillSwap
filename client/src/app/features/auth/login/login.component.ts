import { Component, signal } from '@angular/core';
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

  

  constructor(
    private fb: FormBuilder,
    private auth: AuthService, 
    private router: Router
  ){}

  errorMessage = signal('');
  isSubmitted = signal(true);

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
    this.isSubmitted.set(true);

    const {email, password } = this.loginForm.getRawValue();


    this.auth.login({
      email: email || '', 
      password: password || ''
    }).subscribe({
        next: () => {
          this.isSubmitted.set(false);
          this.router.navigate(['/dashboard'])
        },
        error: (err) => {
          this.isSubmitted.set(false);
          this.errorMessage.set(err?.error?.message || err?.message || 'Login failed')
        }
      });
    
  }

}
