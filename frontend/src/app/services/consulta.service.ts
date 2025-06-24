import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private apiUrl = 'http://localhost:8080/consulta';

  constructor(private http: HttpClient) {
  }

  getAgendamentos(cpf: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/agendamentos-paciente`, {
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

  cancelarAgendamento(codigo: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/cancelar-agendamento/${codigo}`, {});
  }

  realizarCheckIn(codigo: string) {
    return this.http.post(`${this.apiUrl}/check-in/${codigo}`, {});
  }

  getConsultasProximas48h() {
    return this.http.get<any[]>(`${this.apiUrl}/proximas-48h`);
  }

  confirmarComparecimento(codigo: string) {
    return this.http.post(`${this.apiUrl}/confirmar-comparecimento/${codigo}`, {});
  }

  cancelarConsulta(codigo: string) {
    return this.http.post(`${this.apiUrl}/cancelar-consulta/${codigo}`, {});
  }

  realizarConsulta(codigo: string) {
    return this.http.post(`${this.apiUrl}/realizar-consulta/${codigo}`, {})
  }

  cadastrarConsulta(dados: { dataHora: string, especialidade: string, medico: string, valor: number, vagas: number }) {
    return this.http.post(this.apiUrl, dados)
  }

  buscarConsultasComFiltro(filtro: string) {
    const params = new HttpParams().set('filtro', filtro);
    return this.http.get<any[]>(`${this.apiUrl}/filtrar`, { params })
  }
}
