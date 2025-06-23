import {Component, OnInit} from '@angular/core';
import {ConsultaService} from '../../../services/consulta.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {DatePipe, DecimalPipe} from '@angular/common';
import {AuthService} from '../../../services/auth.service';
import {PacienteService} from '../../../services/paciente.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-agendar-consulta',
  imports: [
    DatePipe,
    ReactiveFormsModule,
    DecimalPipe,
    FormsModule
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
  termoBusca = '';
  carregando = false;
  buscaRealizada = false;
  timeoutId: any = null;

  constructor(private consultaService: ConsultaService, private fb: FormBuilder, private auth: AuthService, private pacienteService: PacienteService, private router: Router) {
    this.form = this.fb.group({
      codigoConsulta: ['', Validators.required],
      pontos: [0, [Validators.min(0)]],
      valorConsulta: [0],
      valorFinal: [0]
    });
  }

  ngOnInit(): void {
    const cpf = this.auth.getCpf();
    if (cpf) {
      this.cpf = cpf;
    }

    this.carregarConsultas();

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

    this.form.get('pontos')?.valueChanges?.subscribe(p => {
      const valor = this.form.get('valorConsulta')?.value || 0;
      const pontos = p || 0;
      const desconto = pontos * 5;
      const final = Math.max(0, valor - desconto);
      this.form.patchValue({valorFinal: final}, {emitEvent: false})
    })
  }

  carregarConsultas() {
    this.carregando = true;
    this.consultaService.getConsultasDisponiveis().subscribe({
      next: res => {
        this.consultas = res
        this.carregando = false;
        this.buscaRealizada = false;
      },
      error: err => {
        this.mostrarMensagem('Erro ao carregar consultas', 'danger')
        this.carregando = false;
        console.error(err);
      }
    });
  }

  pesquisarComDelay() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
    this.timeoutId = setTimeout(() => {
      this.buscarConsultas()
    }, 500)
  }

  buscarConsultas() {
    if (!this.termoBusca || this.termoBusca.trim() === '') {
      this.carregarConsultas();
      return;
    }
    this.carregando = true;
    this.buscaRealizada = true;

    this.consultaService.buscarConsultasComFiltro(this.termoBusca).subscribe({
      next: response => {
        this.consultas = response;
        this.carregando = false;
      },
      error: err => {
        console.error(err);
        this.mostrarMensagem('Erro ao filtrar consultas', 'danger');
        this.carregando = false;
      }
    })
  }

  limparBusca() {
    this.termoBusca = '';
    this.carregarConsultas();
  }

  selecionar(consulta: any) {
    this.form.patchValue({
      codigoConsulta: consulta.codigo,
      valorConsulta: consulta.valor,
      valorFinal: consulta.valor
    })
  }

  agendar() {
    if (!confirm('Deseja realmente efetivar a compra?')) return;
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
