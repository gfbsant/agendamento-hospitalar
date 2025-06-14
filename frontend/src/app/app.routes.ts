import {Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {authGuard} from './guards/auth.guard';
import {AutoCadastroComponent} from './pages/auto-cadastro/auto-cadastro.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'auto-cadastro', component: AutoCadastroComponent
  }
];
