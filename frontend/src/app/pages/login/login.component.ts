import {Component, OnInit, PLATFORM_ID} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {RouterLink} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';


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

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
    })
  }

  ngOnInit() {
    setTimeout(() =>{
      if (isPlatformBrowser(PLATFORM_ID)) {
        const mensagemSucesso = sessionStorage.getItem('cadastroSucesso');
        if (mensagemSucesso) {
          this.mensagemSucesso = mensagemSucesso;
          sessionStorage.removeItem('cadastroSucesso')
          setTimeout(() => this.mensagemSucesso = '', 5000)
        }
      }
    }, 1000);

  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading = true;
      const {email, senha} = this.form.value;
      this.authService.login(email, senha).subscribe({
        next: (res) => {
          console.log('Login OK: ', res.token);
          this.authService.setToken(res.token);
          this.loading = false;
          this.erroLogin = false;
        },
        error: () => {
          this.loading = false;
          this.erroLogin = true;
        }
      })
    }
  }

}
