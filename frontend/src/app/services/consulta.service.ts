import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private apiUrl = 'http://localhost:8080/consulta';

  constructor(private http: HttpClient) {
  }

  getAgendamentos(cpf: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/agendamentos`, {
      params: {cpf}
    });
  }

  getConsultasDisponiveis(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/disponiveis`);
  }

  agendarConsulta(dados: {
    pacienteId: string, codigoConsulta: string, pontosUtilizados: number,
    valorPago: number
  }) {
    return this.http.post(`${this.apiUrl}/agendar`, dados);
  }

  cancelarAgendamento(codigo: string) {
    return this.http.post(`${this.apiUrl}/cancelar/${codigo}`, {});
  }

  realizarCheckIn(codigo: string) {
    return this.http.post(`${this.apiUrl}/checkin/${codigo}`, {});
  }

}
