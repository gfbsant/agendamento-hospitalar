import {Routes} from '@angular/router';
import {authGuard} from './guards/auth.guard';
import {AutoCadastroComponent} from './pages/auto-cadastro/auto-cadastro.component';
import {BaseLayoutComponent} from './layout/base-layout/base-layout.component';
import {LoginComponent} from './pages/login/login.component';
import {PacienteHomeComponent} from './pages/paciente/paciente-home/paciente-home.component';
import {CompraPontosComponent} from './pages/paciente/compra-pontos/compra-pontos.component';
import {ExtratoPontosComponent} from './pages/paciente/extrato-pontos/extrato-pontos.component';

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
      {path: 'paciente-home', component: PacienteHomeComponent},
      {path: 'comprar-pontos', component: CompraPontosComponent},
      {path: 'extrato-pontos', component: ExtratoPontosComponent},
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  },


];
