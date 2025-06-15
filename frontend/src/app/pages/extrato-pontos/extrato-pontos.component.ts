import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PacienteService} from '../../services/paciente.service';
import {AuthService} from '../../services/auth.service';
import {RouterLink} from '@angular/router';
import {NgxMaskPipe, provideNgxMask} from 'ngx-mask';

@Component({
  selector: 'app-extrato-pontos',
  imports: [CommonModule, RouterLink, NgxMaskPipe],
  templateUrl: './extrato-pontos.component.html',
  styleUrl: './extrato-pontos.component.css',
  providers: [
    provideNgxMask()
  ],

})
export class ExtratoPontosComponent implements OnInit {
  extrato: any[] = [];
  nome = '';
  cpf = '';
  pontos = 0;

  constructor(private pacienteService: PacienteService, private auth: AuthService) {
  }

  ngOnInit(): void {
    const authCpf = this.auth.getCpf();
    if (authCpf) {
      this.pacienteService.getExtrato(authCpf).subscribe(response => {
        this.nome = response.nome;
        this.cpf = response.cpf;
        this.pontos = response.pontos;
        this.extrato = response.extrato;
      })
    }
  }

}
