import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  erroLogin = false;
  mensagemSucesso = '';
  loading = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
    })
  }

  ngOnInit() {
    const mensagemSucesso = sessionStorage.getItem('cadastroSucesso');
    if (mensagemSucesso) {
      this.mensagemSucesso = mensagemSucesso
      sessionStorage.removeItem('cadastroSucesso')
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading = true;
      const {email, senha} = this.form.value;
      this.authService.login(email, senha).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          console.log('Login OK: ', res.token);
          this.loading = false;
          this.erroLogin = false;
          this.router.navigate(['/dashboard'])
        },
        error: () => {
          this.loading = false;
          this.erroLogin = true;
        }
      })
    }
  }

}
