import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router){}


  login(){
    this.auth.login({email: this.email, password: this.password})
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => alert(err.error.message)
      });
    
  }

}
