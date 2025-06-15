import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private apiUrl = 'http://localhost:8080/paciente';

  constructor(private http: HttpClient) {
  }

  getPerfil(cpf: string) {
    return this.http.get(`${this.apiUrl}/perfil`, {params: {cpf}});
  }

  getSaldo(cpf: string) {
    return this.http.get(`${this.apiUrl}/saldo`, {params: {cpf}});
  }

  comprarPontos(cpf: string, pontos: number, valor: number) {
    return this.http.post(`${this.apiUrl}/comprar-pontos`, {cpf, pontos, valorReais: valor});
  }

  usarPontos(dados: { cpf: string, descricao: string, pontos: number }) {
    return this.http.post(`${this.apiUrl}/usar-pontos`, dados);
  }

  cancelarPontos(dados: { cpf: string, descricao: string, pontos: number }) {
    return this.http.post(`${this.apiUrl}/cancelar-pontos`, dados);
  }

  getExtrato(cpf: string) {
    return this.http.get<any>(`${this.apiUrl}/extrato`, {
      params: {cpf}
    });
  }
}
