import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './acesso/login/login.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { CadastroClienteComponent } from './acesso/cadastro/cadastro-cliente/cadastro-cliente.component';
import { CadastroPrestadorComponent } from './acesso/cadastro/cadastro-prestador/cadastro-prestador.component';
import { AvaliacaoComponent } from './avaliacao/avaliacao.component'
import { ListaServicosDetalhadosComponent } from './lista-servicos-detalhados/lista-servicos-detalhados.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PrestadorComponent } from './prestador/prestador.component';

const routes: Routes = [
  {path: 'perfil', component: PerfilComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cadastro', component: CadastroComponent},  
  {path: 'cadastro-cliente', component: CadastroClienteComponent},
  {path: 'cadastro-prestador', component: CadastroPrestadorComponent},
  {path: '', component: HomeComponent},
  {path: 'avaliacao', component: AvaliacaoComponent},
  {path: 'servico-detalhado/tipo-servico/:id', component: ListaServicosDetalhadosComponent},
  {path: 'prestador', component: PrestadorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule { }