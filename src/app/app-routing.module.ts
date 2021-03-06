import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { LoginComponent } from 'src/app/acesso/login/login.component';
import { CadastroComponent } from 'src/app/acesso/cadastro/cadastro.component';
import { AvaliacaoComponent } from 'src/app/avaliacoes/avaliacao/avaliacao.component';
import { ListaServicosDetalhadosComponent } from 'src/app/lista-servicos-detalhados/lista-servicos-detalhados.component';
import { PerfilComponent } from 'src/app/perfis/perfil/perfil.component';
import { PrestadorComponent } from 'src/app/prestador/prestador.component';
import { SucessoCadastroComponent } from './acesso/sucesso-cadastro/sucesso-cadastro.component';
import { TokenAtivacaoComponent } from './acesso/token-ativacao/token-ativacao.component';
import { AgendamentoComponent } from './agendamentos/agendamento/agendamento.component';
import { ConfirmacaoAgendamentoComponent } from './agendamentos/confirmacao-agendamento/confirmacao-agendamento.component';
import { VisualizacaoAgendamentoComponent } from './agendamentos/visualizacao-agendamento/visualizacao-agendamento.component';
import { GeolocalizacaoComponent } from './geolocalizacao/geolocalizacao/geolocalizacao.component';

const routes: Routes = [
  { path: 'perfil', component: PerfilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: '', component: HomeComponent },
  { path: 'prestador/:idPrestador/servico/:idServico/avaliacao', component: AvaliacaoComponent },
  { path: 'servico-detalhado/tipo-servico/:id', component: ListaServicosDetalhadosComponent },
  { path: 'prestador/:id', component: PrestadorComponent },
  { path: 'cadastro-sucesso', component: SucessoCadastroComponent },
  { path: 'confirmacao-registro', component: TokenAtivacaoComponent },
  { path: 'prestador/:prestadorId/servicoDetalhado/:servicoDetalhadoId/agendamento', component: AgendamentoComponent },
  { path: 'agendamento/:idAgendamento', component: VisualizacaoAgendamentoComponent },
  { path: 'agendamento-feedback/:idAgendamento/:status', component: ConfirmacaoAgendamentoComponent },
  { path: 'mapa', component: GeolocalizacaoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
