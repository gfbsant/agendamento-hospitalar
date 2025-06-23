import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {ViaCepService} from '../../services/via-cep.service';
import {NgxMaskDirective, provideNgxMask} from 'ngx-mask';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {PacienteService} from '../../services/paciente.service';

@Component({
  standalone: true,
  selector: 'app-auto-cadastro',
  imports: [
    ReactiveFormsModule, CommonModule, NgxMaskDirective, RouterLink
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './auto-cadastro.component.html',
  styleUrl: './auto-cadastro.component.css'
})
export class AutoCadastroComponent implements OnDestroy {
  form: FormGroup;
  mensagemErro = '';
  emailOcupado = false;
  cpfOcupado = false;
  loading = false;
  private timerNumero: any = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private viaCep: ViaCepService, private router: Router, private authService: AuthService, private pacienteService: PacienteService) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      cep: ['', Validators.required],
      endereco: ['', Validators.required],
      numero: ['', Validators.required]
    })
  }

  buscarCep() {
    const cep = this.form.value.cep;
    if (!cep) return;

    this.viaCep.buscarEndereco(cep).subscribe({
      next: (res) => {
        if (res.erro) {
          this.mensagemErro = 'CEP não encontrado';
          this.form.patchValue({endereco: ''});
        } else {
          const numero = this.form.get('numero')?.value || '';
          const endereco = `${res.logradouro}${numero ? ', ' + numero : ''} - ${res.bairro} - ${res.localidade}`;
          this.form.patchValue({endereco});
        }
      },
      error: () => this.mensagemErro = 'Erro ao consultar CEP'
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true
    const {cpf, nome, email, cep, endereco} = this.form.value;
    const cepFormatado = this.aplicarMascaraCep(cep);

    const usuario = {email, cpf, nome, tipo: 'PACIENTE'};
    const paciente = {cpf, nome, email, endereco, cep: cepFormatado};

    this.mensagemErro = '';

    this.authService.registro(usuario).subscribe({
      next: () => {
        this.pacienteService.registro(paciente).subscribe({
          next: () => {
            sessionStorage.setItem('cadastroSucesso', 'Cadastro realizado com sucesso! ' +
              'Sua senha foi enviada para o email ' + this.form.get('email')?.value);
            this.loading = false;
            this.form.reset();
            this.router.navigate(['/login'])
          },
          error: () => {
            this.mensagemErro = 'Erro ao registrar paciente. Revertendo...';
            this.authService.delete(email).subscribe({
              next: () => {
                this.mensagemErro += ' Cadastro revertido com sucesso.';
                this.loading = false;
              },
              error: () => {
                this.mensagemErro += ' Erro ao reverter cadastro no Auth.';
                this.loading = false;
              }
            });
          }
        });
      },
      error: () => {
        this.mensagemErro = 'Erro ao registrar usuário.';
        this.loading = false
      }
    })
  }

  verificarEmail() {
    const email = this.form.get('email')?.value;
    if (!email) return;
    this.http.get<any>(`http://localhost:8080/auth/existe?email=${email}`).subscribe(res => {
      this.emailOcupado = res.email;
    })
  }

  verificarCpf() {
    const cpf = this.form.get('cpf')?.value;
    if (!cpf) return;
    this.http.get<any>(`http://localhost:8080/auth/existe?cpf=${cpf}`).subscribe(res => {
      this.cpfOcupado = res.cpf;
    })
  }

  aplicarMascaraCep(cep: string): string {
    const cepNumerico = cep.replace(/\D/g, '');
    if (cepNumerico.length === 8) {
      return cepNumerico.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
    return cepNumerico;
  }

  verificarComprimentoCep(): void {
    const cepDigitado = this.form.get('cep')?.value?.replace(/\D/g, '');
    if (cepDigitado?.length >= 8) {
      this.buscarCep();
    }
  }

  agendarBuscaPorNumero(): void {
    if (this.timerNumero) {
      clearTimeout(this.timerNumero);
    }
    this.timerNumero = setTimeout(() => {
      this.buscarCep();
    }, 500);
  }

  ngOnDestroy(): void {
    if (this.timerNumero) {
      clearTimeout(this.timerNumero);
    }
  }
}
