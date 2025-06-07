import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {NgIf} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;
  erroLogin = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      const {email, senha} = this.form.value;
      this.authService.login(email, senha).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          console.log('Login OK: ', res.token);
          this.erroLogin = false;
        },
        error: () => {
          this.erroLogin = true;
        }
      })
    }
  }

}
