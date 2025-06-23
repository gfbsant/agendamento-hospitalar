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
import {FuncionarioHomeComponent} from './pages/funcionario/funcionario-home/funcionario-home.component';
import {CadastroConsultaComponent} from './pages/funcionario/cadastro-consulta/cadastro-consulta.component';
import {CrudFuncionarioComponent} from './pages/funcionario/crud-funcionario/crud-funcionario.component';
import {FuncionarioGuard} from './guards/funcionario.guard';
import {PacienteGuard} from './guards/paciente.guard';
import {AcessoNegadoComponent} from './pages/acesso-negado/acesso-negado.component';

export const pacienteRoutes: Routes = [
  {path: 'paciente-home', component: PacienteHomeComponent, canActivate: [PacienteGuard]},
  {path: 'comprar-pontos', component: CompraPontosComponent, canActivate: [PacienteGuard]},
  {path: 'extrato-pontos', component: ExtratoPontosComponent, canActivate: [PacienteGuard]},
  {path: 'agendar-consulta', component: AgendarConsultaComponent, canActivate: [PacienteGuard]},
  {path: 'cancelar-consulta', component: CancelarAgendamentoComponent, canActivate: [PacienteGuard]},
  {path: 'check-in', component: CheckInComponent}
];

export const funcionarioRoutes: Routes = [
  {path: 'funcionario-home', component: FuncionarioHomeComponent, canActivate: [FuncionarioGuard]},
  {path: 'cadastro-consulta', component: CadastroConsultaComponent, canActivate: [FuncionarioGuard]},
  {path: 'crud-funcionario', component: CrudFuncionarioComponent, canActivate: [FuncionarioGuard]}
]

export const routes: Routes = [
  {
    path: 'auto-cadastro', component: AutoCadastroComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'acesso-negado', component: AcessoNegadoComponent
  },
  {
    path: '',
    component: BaseLayoutComponent,
    canActivate: [authGuard],
    children: [
      ...pacienteRoutes,
      ...funcionarioRoutes
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  },
];



