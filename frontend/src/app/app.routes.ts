import {Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {authGuard} from './guards/auth.guard';
import {AutoCadastroComponent} from './pages/auto-cadastro/auto-cadastro.component';
import {BaseLayoutComponent} from './layout/base-layout/base-layout.component';
import {LoginComponent} from './pages/login/login.component';
import {PacienteHomeComponent} from './pages/paciente/paciente-home/paciente-home.component';

export const routes: Routes = [
  {
    path: 'auto-cadastro', component: AutoCadastroComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: BaseLayoutComponent,
    canActivate: [authGuard],
    children: [
      {path: 'paciente-home', component: PacienteHomeComponent}
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  },


];
