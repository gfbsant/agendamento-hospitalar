import {Component, OnInit} from '@angular/core';
import {ConsultaService} from '../../../services/consulta.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-funcionario-home',
  imports: [
    DatePipe
  ],
  templateUrl: './funcionario-home.component.html',
  styleUrl: './funcionario-home.component.css'
})
export class FuncionarioHomeComponent implements OnInit {

  consultas: any[] = [];
  mensagem = '';
  tipoMensagem = 'success';
  consultaSelecionada: any = null;

  constructor(private consultaService: ConsultaService) {
  }

  ngOnInit(): void {
    this.carregarConsultas();
  }

  carregarConsultas() {
    this.consultaService.getConsultasProximas48h().subscribe({
      next: consultas => this.consultas = consultas.slice().reverse(),
      error: err => this.mostrarMensagem("Erro ao obter consultas: " + err, "danger")
    })
  }

  confirmarComparecimento(codigoConsulta: string) {
    this.consultaService.confirmarComparecimento(codigoConsulta).subscribe({
      next: () => {
        this.mostrarMensagem("Comparecimento confirmado!");
        setTimeout(() => {
          this.carregarConsultas();
          this.consultaSelecionada = null
        }, 1200);
      },
      error: err => this.mostrarMensagem("Erro ao confirmar comparecimento: " + err.error.msg, "danger")
    })
  }

  cancelarConsulta(codigoConsulta: string) {
    if (!confirm('Deseja realmente cancelar esta consulta?')) return;
    this.consultaService.cancelarConsulta(codigoConsulta).subscribe({
      next: () => {
        this.mostrarMensagem("Cancelamento confirmado!");
        setTimeout(() => {
          this.carregarConsultas();
          this.consultaSelecionada = null
        }, 1200);
      },
      error: err => this.mostrarMensagem("Erro ao cancelar consulta: " + err, 'danger')
    })
  }

  realizarConsulta(codigoConsulta: string) {
    this.consultaService.realizarConsulta(codigoConsulta).subscribe({
      next: () => {
        this.mostrarMensagem("Consulta realizada com sucesso!");
        setTimeout(() => {
          this.carregarConsultas();
          this.consultaSelecionada = null
        }, 1200);
      },
      error: err => this.mostrarMensagem("Erro ao cancelar consulta" + err, 'danger')
    })
  }

  mostrarMensagem(mensagem: string, tipoMensagem: string = 'success') {
    this.mensagem = mensagem;
    this.tipoMensagem = tipoMensagem;
    if (tipoMensagem === 'success')
      setTimeout(() => this.mensagem = '', 5000);
  }

  selecionarConsulta(consulta: any): void {
    this.consultaSelecionada = consulta;
  }

  formatarCpf(cpf: string): string {
    if (!cpf || cpf.length !== 11) {
      return cpf;
    }
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'DISPONIVEL':
        return 'success';
      case 'COMPARECEU':
        return 'success';
      case 'REALIZADA':
        return 'secondary';
      case 'CANCELADA':
        return 'danger';
      case 'REALIZADO':
        return 'secondary';
      case 'CANCELADO':
        return 'danger';
      case 'FALTOU':
        return 'secondary';
      case 'CHECK_IN':
        return 'warning';
      case 'CRIADO':
        return 'info';
      default:
        return 'secondary';
    }
  }
}
