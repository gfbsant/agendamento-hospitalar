import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router, RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.css'
})
export class BaseLayoutComponent implements OnInit {
  tipo: "PACIENTE" | "FUNCIONARIO" | null = null;

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.tipo = this.auth.getTipo();
  }


  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }

  getButtonClass(route: string): string {
    var isCurrentRoute = this.router.url === route;
    if (isCurrentRoute) {
      return "btn btn-outline-light active btn-sm";
    } else {
      return "btn btn-outline-light btn-sm";
    }
  }
}
