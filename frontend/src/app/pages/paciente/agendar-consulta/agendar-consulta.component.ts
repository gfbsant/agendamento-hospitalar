import {Component, OnInit} from '@angular/core';
import {ConsultaService} from '../../../services/consulta.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DatePipe, DecimalPipe} from '@angular/common';
import {AuthService} from '../../../services/auth.service';
import {PacienteService} from '../../../services/paciente.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-agendar-consulta',
  imports: [
    DatePipe,
    ReactiveFormsModule,
    DecimalPipe
  ],
  templateUrl: './agendar-consulta.component.html',
  styleUrl: './agendar-consulta.component.css'
})
export class AgendarConsultaComponent implements OnInit {

  consultas: any[] = [];
  cpf = '';
  mensagem = '';
  tipoMensagem = 'success';
  form!: FormGroup;
  saldoPontos = 0;

  constructor(private consultaService: ConsultaService, private fb: FormBuilder, private auth: AuthService, private pacienteService: PacienteService, private router: Router) {
  }

  ngOnInit(): void {
    const cpf = this.auth.getCpf();
    if (cpf) {
      this.cpf = cpf;
    }
    this.consultaService.getConsultasDisponiveis().subscribe({
      next: res => this.consultas = res,
      error: () => this.mostrarMensagem('Erro ao carregar consultas', 'danger')
    });

    this.pacienteService.getSaldo(cpf!).subscribe({
      next: saldo => {
        this.saldoPontos = saldo as number;
        this.form.get('pontos')?.setValidators([
          Validators.required,
          Validators.min(0),
          Validators.max(this.saldoPontos)
        ]);
        this.form.get('pontos')?.updateValueAndValidity();
      },
      error: () => this.mostrarMensagem('Erro ao carregar saldo', 'danger')
    });

    this.form = this.fb.group({
      codigoConsulta: ['', Validators.required],
      pontos: [0, [Validators.min(0)]],
      valorConsulta: [0],
      valorFinal: [0]
    });

    this.form.get('pontos')?.valueChanges?.subscribe(p => {
      const valor = this.form.get('valorConsulta')?.value || 0;
      const pontos = p || 0;
      const desconto = pontos * 5;
      const final = Math.max(0, valor - desconto);
      this.form.patchValue({valorFinal: final}, {emitEvent: false})
    })
  }

  selecionar(consulta: any) {
    this.form.patchValue({
      codigoConsulta: consulta.codigo,
      valorConsulta: consulta.valor,
      valorFinal: consulta.valor
    })
  }

  agendar() {
    const {codigoConsulta, pontos, valorFinal} = this.form.value;

    if (!codigoConsulta || pontos == null || valorFinal == null) {
      this.mostrarMensagem('Preencha todos os dados corretamente.', 'danger');
      return;
    }

    const dadosAgendamento = {
      pacienteId: this.cpf,
      codigoConsulta,
      pontosUtilizados: pontos,
      valorPago: valorFinal
    };

    this.consultaService.agendarConsulta(dadosAgendamento).subscribe({
      next: () => {
        this.mostrarMensagem('Consulta agendada com sucesso!');
        setTimeout(() => {
          this.router.navigate(['/paciente-home'])
        }, 1500);
      },
      error: () => this.mostrarMensagem('Erro ao agendar consulta', 'danger')
    });

    if (pontos > 0) {
      const dadosUsoPontos = {
        cpf: this.cpf,
        descricao: 'Agendamento de Nova Consulta',
        pontos: pontos
      };
      this.pacienteService.usarPontos(dadosUsoPontos).subscribe({
        next: () => console.log('Pontos utilizados com sucesso'),
        error: () => console.log('Erro ao utilizar pontos')
      });
    }

  }

  private mostrarMensagem(msg: string, tipo: string = 'success') {
    this.mensagem = msg;
    this.tipoMensagem = tipo;
    setTimeout(() => this.mensagem = '', 3000);
  }
}
