import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {CommonModule, Location} from '@angular/common';

@Component({
  selector: 'app-acesso-negado',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './acesso-negado.component.html',
  styleUrl: './acesso-negado.component.css'
})
export class AcessoNegadoComponent {

  constructor(private router: Router, private authService: AuthService, private location: Location) {
  }

  voltar() {
    this.location.historyGo(-2);
  }

  voltarParaLogin() {
    if (this.authService.isLoggedIn()) {
      this.authService.logout();
    }
    this.router.navigate(['/login']);
  }
}
