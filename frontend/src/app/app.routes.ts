import {Routes} from '@angular/router';
import {authGuard} from './guards/auth.guard';
import {AutoCadastroComponent} from './pages/auto-cadastro/auto-cadastro.component';
import {BaseLayoutComponent} from './layout/base-layout/base-layout.component';
import {LoginComponent} from './pages/login/login.component';
import {PacienteHomeComponent} from './pages/paciente/paciente-home/paciente-home.component';
import {CompraPontosComponent} from './pages/paciente/compra-pontos/compra-pontos.component';
import {ExtratoPontosComponent} from './pages/paciente/extrato-pontos/extrato-pontos.component';
import {AgendarConsultaComponent} from './pages/paciente/agendar-consulta/agendar-consulta.component';
import {CancelarAgendamentoComponent} from './pages/paciente/cancelar-agendamento/cancelar-agendamento.component';
import {CheckInComponent} from './pages/paciente/check-in/check-in.component';

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
      {path: 'agendar-consulta', component: AgendarConsultaComponent},
      {path: 'cancelar-consulta', component: CancelarAgendamentoComponent},
      {path: 'check-in', component: CheckInComponent}
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  },


];
