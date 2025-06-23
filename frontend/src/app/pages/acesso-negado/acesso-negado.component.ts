import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-acesso-negado',
  imports: [],
  templateUrl: './acesso-negado.component.html',
  styleUrl: './acesso-negado.component.css'
})
export class AcessoNegadoComponent {

  constructor(private router: Router, private authService: AuthService) {
  }

  voltarParaLogin() {
    if (this.authService.isLoggedIn()) {
      this.authService.logout()
    }
    this.router.navigate(['/login'])
  }
}
