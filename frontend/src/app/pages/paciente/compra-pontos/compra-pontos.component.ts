import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PacienteService} from '../../../services/paciente.service';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {CommonModule, DecimalPipe} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-compra-pontos',
  imports: [
    ReactiveFormsModule,
    DecimalPipe, CommonModule
  ],
  templateUrl: './compra-pontos.component.html',
  styleUrl: './compra-pontos.component.css'
})
export class CompraPontosComponent {
  form: FormGroup;
  valorTotal = 0;
  mensagem = '';
  cpf= '';

  constructor(private formBuilder: FormBuilder, private pacienteService: PacienteService, private auth: AuthService, private router: Router) {
    const cpf = this.auth.getCpf();
    if (cpf) {
      this.cpf = cpf;
    }
    this.form = this.formBuilder.group({
      pontos: [0, [Validators.required, Validators.min(1)]]
    });
    this.form.get('pontos')?.valueChanges?.subscribe(qtd=> {
      this.valorTotal = qtd * 5;
    });
  }

  comprar() {
    const pontos = this.form.value.pontos;
    this.pacienteService.comprarPontos(this.cpf, pontos, this.valorTotal).subscribe({
      next: () => {
        this.mensagem = 'Compra realizada com sucesso!';
        this.form.reset();
        setTimeout(() => {
          this.router.navigate(['/paciente-home'])
        }, 1500);
      }, error: (e) => {
        console.log(e);
        this.mensagem = 'Erro ao processar a compra.';
      }
    })
  }

  incrementarPontos() {
    const pontosAtuais = this.form.get('pontos')?.value || 0;
    this.form.get('pontos')?.setValue(pontosAtuais + 1);
  }
}
