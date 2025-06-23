import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FuncionarioService} from '../../../services/funcionario.service';
import {NgClass} from '@angular/common';
import {AuthService} from '../../../services/auth.service';
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from 'ngx-mask';

@Component({
  selector: 'app-crud-funcionario',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    NgxMaskDirective
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './crud-funcionario.component.html',
  styleUrl: './crud-funcionario.component.css'
})
export class CrudFuncionarioComponent implements OnInit {

  funcionarios: any[] = [];
  form!: FormGroup;
  mostrandoFormulario = false;
  editando = false;
  cpfSelecionado: string | null = null;
  mensagem = '';
  tipoMensagem = 'success';
  loading = false;
  emailSelecionado: string | null = null;

  constructor(private fb: FormBuilder, private funcionarioService: FuncionarioService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.required],
      telefone: ['', Validators.required]
    });
    this.carregarFuncionarios();
  }

  carregarFuncionarios() {
    this.funcionarioService.listarTodos().subscribe({
      next: value => this.funcionarios = value,
      error: err => {
        this.mostrarMensagem('Erro ao obter funcionarios: ' + err.error, 'danger')
      }
    })
  }

  abrirFormularioNovoFuncionario() {
    this.mostrandoFormulario = true;
    this.editando = false;
    this.cpfSelecionado = null;
    this.form.reset()
  }

  editarFuncionario(funcionario: any) {
    this.form.patchValue(funcionario);
    this.cpfSelecionado = funcionario.cpf;
    this.emailSelecionado = funcionario.email;
    this.editando = true;
    this.mostrandoFormulario = true;
  }

  salvar() {
    if (this.form.invalid) {
      this.mostrarMensagem('Preencha os dados corretamente!', 'danger');
      return;
    }
    this.loading = true;

    const funcionario = this.form.value;
    if (this.editando) {
      const email = funcionario.email;
      if (email !== this.emailSelecionado) {
        this.authService.atualizarEmail(this.cpfSelecionado!, email).subscribe();
      }
      this.funcionarioService.atualizarFuncionario(this.cpfSelecionado!, funcionario).subscribe({
        next: () => {
          this.mostrarMensagem('Funcionario editado com sucesso');
          this.form.reset();
          this.mostrandoFormulario = false;
          this.editando = false;
          this.cpfSelecionado = null;
          this.emailSelecionado = null;
          this.loading = false;
          setTimeout(() => this.carregarFuncionarios(), 800);
        }, error: err => {
          this.mostrarMensagem('Erro ao editar: ' + err.error, 'danger');
          this.loading = false;
        }
      })
    } else {
      const usuario = {email: funcionario.email, cpf: funcionario.cpf, nome: funcionario.nome, tipo: 'FUNCIONARIO'};
      this.authService.registro(usuario).subscribe({
        next: () => {
          this.funcionarioService.cadastrarFuncionario(funcionario).subscribe({
            next: () => {
              this.mostrarMensagem('Funcionario adicionado com sucesso! \nSua senha foi enviada para ' + this.form.get('email')?.value);
              this.form.reset();
              this.mostrandoFormulario = false;
              this.editando = false;
              this.cpfSelecionado = null;
              this.loading = false;
              setTimeout(() => this.carregarFuncionarios(), 1200);
            }, error: err => {
              this.loading = false;
              this.mostrarMensagem('Erro ao salvar: ' + err.error, 'danger');
              this.authService.delete(funcionario.email).subscribe();
            }
          });
        },
        error: err => {
          this.loading = false;
          this.mostrarMensagem("Erro ao salvar funcionario Auth: " + err.error);
        }
      });

    }
  }

  inativarFuncionario(cpf: string) {
    if (!confirm('Deseja realmente inativar esse funcionario?')) return;
    this.funcionarioService.inativarFuncionario(cpf).subscribe({
      next: () => {
        this.mostrarMensagem('Funcionario inativado com sucesso.');
        setTimeout(() => this.carregarFuncionarios());
      },
      error: err => this.mostrarMensagem('Erro ao inativar funcionario: ' + err.error, 'danger')
    })
  }

  cancelarFormulario() {
    this.form.reset();
    this.mostrandoFormulario = false;
    this.editando = false;
    this.cpfSelecionado = null;
  }

  mostrarMensagem(mensagem: string, tipoMensagem: string = 'success') {
    this.mensagem = mensagem;
    this.tipoMensagem = tipoMensagem;
    if (tipoMensagem === 'success')
      setTimeout(() => this.mensagem = '', 5000)
  }
}
