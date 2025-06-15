import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {PacienteService} from '../../../services/paciente.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-paciente-home',
  imports: [
    RouterLink
  ],
  templateUrl: './paciente-home.component.html',
  styleUrl: './paciente-home.component.css'
})
export class PacienteHomeComponent implements OnInit {
  saldo: any;

  constructor(private authService: AuthService, private pacienteService: PacienteService) {
  }

  ngOnInit(): void {
    const cpf = this.authService.getCpf();
    if (cpf) {
      this.pacienteService.getSaldo(cpf).subscribe(saldo =>
        this.saldo = saldo
      );

    }

  }

}
