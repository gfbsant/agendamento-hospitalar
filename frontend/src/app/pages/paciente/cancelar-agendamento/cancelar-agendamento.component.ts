import {Component, OnInit} from '@angular/core';
import {ConsultaService} from '../../../services/consulta.service';
import {PacienteService} from '../../../services/paciente.service';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-cancelar-agendamento',
  imports: [
    DatePipe
  ],
  templateUrl: './cancelar-agendamento.component.html',
  styleUrl: './cancelar-agendamento.component.css'
})
export class CancelarAgendamentoComponent implements OnInit {

  agendamentos: any[] = [];
  mensagem = '';
  tipoMensagem = 'success';
  cpf = '';
  agendamentoSelecionado: any = null;

  constructor(private consultaService: ConsultaService, private pacienteService: PacienteService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    const cpf = this.authService.getCpf();
    if (cpf) {
      this.cpf = cpf;
      this.consultaService.getAgendamentos(cpf).subscribe({
        next: agendamentos => {
          this.agendamentos = agendamentos.filter(agendamento => agendamento.status === 'CRIADO' ||
            agendamento.status === 'CHECK-IN');
        },
        error: err => {
          this.mostrarMensagem('Erro ao recuperar agendamentos: ' + err, 'danger')
        }
      })
    } else {
      this.mostrarMensagem("CPF não localizado", 'danger');
    }
  }

  cancelar(ag: any) {
    this.consultaService.cancelarAgendamento(ag.codigo).subscribe({
      next: () => {
        const dados = {cpf: this.cpf, descricao: 'Cancelamento de Agendamento', pontos: ag.pontosUtilizados ?? 0}
        this.pacienteService.cancelarPontos(dados).subscribe();
        this.mostrarMensagem("Agendamento cancelado com sucesso");
        this.agendamentos = this.agendamentos.filter(item => item.codigo !== ag.codigo);
        setTimeout(() => this.router.navigate(['/paciente-home']), 4000);
      },
      error: err => this.mostrarMensagem("Erro ao cancelar agendamento: " + err)
    });
    this.agendamentoSelecionado = null;
  }

  selecionar(agendamento: any) {
    this.agendamentoSelecionado = agendamento;
  }

  mostrarMensagem(msg: string, tipo: string = 'success') {
    this.mensagem = msg;
    this.tipoMensagem = tipo;
    setTimeout(() => this.mensagem = '', 3000);
  }
}
