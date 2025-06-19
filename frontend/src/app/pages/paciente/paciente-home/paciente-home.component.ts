import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {PacienteService} from '../../../services/paciente.service';
import {RouterLink} from '@angular/router';
import {ConsultaService} from '../../../services/consulta.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-paciente-home',
  imports: [
    RouterLink,
    DatePipe
  ],
  templateUrl: './paciente-home.component.html',
  styleUrl: './paciente-home.component.css'
})
export class PacienteHomeComponent implements OnInit {
  mensagem = '';
  tipoMensagem = 'info';
  saldo: any;
  agendamentos: any[] = [];


  constructor(private authService: AuthService, private pacienteService: PacienteService, private consultaService: ConsultaService) {
  }

  ngOnInit(): void {
    const cpf = this.authService.getCpf();
    if (cpf) {
      this.pacienteService.getSaldo(cpf).subscribe({
        next: saldo =>
          this.saldo = saldo,
        error: () => this.mostrarMensagem('Erro ao carregar saldo', 'danger')
      });
      this.consultaService.getAgendamentos(cpf).subscribe({
        next: res =>
          this.agendamentos = res,
        error: () => this.mostrarMensagem('Erro ao carregar agendamentos', 'danger')
      });
    }
  }

  mostrarMensagem(texto: string, tipo: string = 'info') {
    this.mensagem = texto;
    this.tipoMensagem = tipo;
    setTimeout(() => this.mensagem = '', 3000);
  }

  filtrarPorStatus(status: string): any[] {
    return this.agendamentos.filter(a => a.status === status);
  }

  temAgendamentosAtivos(): boolean {
    return this.filtrarPorStatus('CRIADO').length > 0 ||
      this.filtrarPorStatus('CHECK_IN').length > 0;
  }

  temHistorico(): boolean {
    return this.filtrarPorStatus('REALIZADO').length > 0 ||
      this.filtrarPorStatus('CANCELADO').length > 0;
  }
}
