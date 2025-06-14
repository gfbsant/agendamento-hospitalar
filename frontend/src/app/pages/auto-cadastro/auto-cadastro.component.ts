import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {ViaCepService} from '../../services/via-cep.service';

@Component({
  standalone: true,
  selector: 'app-auto-cadastro',
  imports: [
    ReactiveFormsModule, CommonModule
  ],
  templateUrl: './auto-cadastro.component.html',
  styleUrl: './auto-cadastro.component.css'
})
export class AutoCadastroComponent {
  form: FormGroup;
  mensagemErro = '';
  mensagemSucesso = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private viaCep: ViaCepService) {
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
          const endereco = `${res.logradouro}${numero ? ', ' + numero : ''}, ${res.bairro} - ${res.localidade}`;
          this.form.patchValue({endereco});
        }
      },
      error: () => this.mensagemErro = 'Erro ao consultar CEP'
    });
  }

  atualizarEnderecoComNumero() {
    const endereco = this.form.get('endereco')?.value || '';
    const numero = this.form.get('numero')?.value || '';
    if (endereco && numero) {
      return `${endereco}, ${numero}`;
    }
    return endereco;
  }

  onSubmit() {
    if (this.form.invalid) return;

    const {cpf, nome, email, cep, endereco} = this.form.value;

    const usuario = {email, cpf, nome, tipo: 'PACIENTE'};
    const paciente = {cpf, nome, email, endereco, cep};

    this.mensagemErro = '';
    this.mensagemSucesso = '';

    this.http.post('http://localhost:8080/auth/auth-registro', usuario).subscribe({
      next: () => {
        this.http.post('http://localhost:8080/paciente/registrar', paciente).subscribe({
          next: () => {
            this.mensagemSucesso = 'Cadastro realizado com sucesso!';
            this.form.reset();
          },
          error: () => {
            this.mensagemErro = 'Erro ao registrar paciente. Revertendo...';
            this.http.delete(`http://localhost:8080/auth/usuario?email=${email}`).subscribe({
              next: () => this.mensagemErro += '\nCadastro revertido com sucesso.',
              error: () => this.mensagemErro += '\nErro ao reverted cadastro no Auth.'
            })
          }
        })
      },
      error: () => this.mensagemErro = 'Erro ao registrar usuário.'
    })
  }
}
