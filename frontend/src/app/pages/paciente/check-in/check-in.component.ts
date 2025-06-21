import {Component, OnInit} from '@angular/core';
import {ConsultaService} from '../../../services/consulta.service';
import {AuthService} from '../../../services/auth.service';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-check-in',
  imports: [
    DatePipe
  ],
  templateUrl: './check-in.component.html',
  styleUrl: './check-in.component.css'
})
export class CheckInComponent implements OnInit {

  agendamentos: any [] = [];
  agendamentoSelecionado: any = null;
  cpf = '';
  mensagem = '';
  tipoMensagem = 'success';

  constructor(private consultaService: ConsultaService, private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    const cpf = this.auth.getCpf();
    if (cpf) {
      this.cpf = cpf;
      this.consultaService.getAgendamentos(cpf).subscribe({
        next: agendamentos => this.agendamentos = agendamentos.filter(ag =>
          ag.status === 'CRIADO' && this.prazoValido(ag.dataHora)),
        error: err => {
          console.log("Erro: " + err);
          this.mostrarMensagem("Erro ao obter agendamentos.", 'danger')
        }
      })
    }
  }

  prazoValido(data: string) {
    const horarioConsulta = new Date(data).getTime();
    const agora = Date.now();
    const diferencaEmHoras = (horarioConsulta - agora) / 1000 / 60 / 60;
    return diferencaEmHoras <= 48 && diferencaEmHoras > 0;
  }

  selecionar(agendamento: any) {
    this.agendamentoSelecionado = agendamento;
  }

  checkIn(codigo: string) {
    this.consultaService.realizarCheckIn(codigo).subscribe({
      next: () => {
        this.mostrarMensagem("Check-in realizado com sucesso!");
        this.agendamentos = this.agendamentos.filter(ag => ag.codigo !== codigo);
        setTimeout(() => this.router.navigate(["/paciente-home"]), 3000)
      },
      error: err => {
        console.log("Erro: " + err);
        this.mostrarMensagem("Erro ao realizar check-in")
      }
    });
    this.agendamentoSelecionado = null;
  }

  mostrarMensagem(mensagem: string, tipoMensagem: string = 'success') {
    this.mensagem = mensagem;
    this.tipoMensagem = tipoMensagem;
    setTimeout(() => this.mensagem = '', 3000)
  }

}
