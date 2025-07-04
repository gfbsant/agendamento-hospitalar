import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import {Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';
import {PLATFORM_ID} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth'

  private tipoKey = 'tipo';
  private tokenKey = 'token';
  private isBrowser: boolean;

  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  login(email: String, senha: String): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, {email, senha}).pipe(
      tap(res => {
        console.log('Login efetuado com sucesso.')
        this.redirecionarPorTipoUsuario(res.token);
      })
    );
  }

  registroPaciente(usuarioAuth: any) {
    return this.http.post(`${this.apiUrl}/registro-paciente`, usuarioAuth);
  }

  registroFuncionario(usuarioAuth: any) {
    return this.http.post(`${this.apiUrl}/registro-funcionario`, usuarioAuth);
  }

  delete(email: string) {
    return this.http.delete(`${this.apiUrl}/usuario?email=${email}`)
  }

  atualizarEmail(cpf: string, email: string) {
    return this.http.put(`${this.apiUrl}/atualizar-email/${cpf}`, email)
  }

  verificarCpf(cpf: string) {
    return this.http.get<any>(`${this.apiUrl}/existe?cpf=${cpf}`);
  }

  verificarEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/existe?email=${email}`);
  }

  redirecionarPorTipoUsuario(token: string) {
    try {
      const decodedToken: any = jwtDecode(token)
      const tipoUsuario = decodedToken.tipo;
      this.setTipo(tipoUsuario);
      if (tipoUsuario === 'PACIENTE') {
        this.router.navigate(['/paciente-home']);
      } else if (tipoUsuario === 'FUNCIONARIO') {
        this.router.navigate(['/funcionario-home']);
      }
    } catch (e) {
      console.error('Erro ao decodificar token: ', e);
      this.router.navigate(['/login']);
    }
  }

  getCpf(): string | null {
    if (this.isBrowser) {
      const token = localStorage.getItem('token');
      if (!token) return null;
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.cpf || null;
    }
    return null;
  }

  logout() {
    if (this.isBrowser) {
      localStorage.clear();
    }
  }

  getTipo(): 'PACIENTE' | 'FUNCIONARIO' | null {
    if (this.isBrowser) {
      return localStorage.getItem(this.tipoKey) as any;
    }
    return null;
  }

  isLoggedIn(): boolean {
    if (this.isBrowser) {
      return !!localStorage.getItem(this.tokenKey);
    }
    return false;
  }

  setTipo(tipo: string) {
    if (this.isBrowser) {
      localStorage.setItem(this.tipoKey, tipo);
    }
  }

  setToken(token: string) {
    if (this.isBrowser) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  isTokenValid(token: string): boolean {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp == undefined) return false;
      const expTime = 1000 * decodedToken.exp;
      const now = Date.now();
      return expTime >= now;
    } catch (e) {
      console.error('Erro ao decodificar token:', e);
      return false;
    }
  }

}
