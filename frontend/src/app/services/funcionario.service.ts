import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class FuncionarioService {
  private apiUrl = 'http://localhost:8080/consulta/funcionarios';

  constructor(private http: HttpClient) {
  }

  cadastrarFuncionario(dados: any) {
    return this.http.post(this.apiUrl, dados);
  }

  atualizarFuncionario(cpf: string, dados: any) {
    return this.http.put(`${this.apiUrl}/${cpf}`, dados);
  }

  inativarFuncionario(cpf: string) {
    return this.http.patch(`${this.apiUrl}/inativar/${cpf}`, {});
  }

  listarTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
