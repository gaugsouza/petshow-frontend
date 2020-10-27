import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { LoginComponent } from 'src/app/acesso/login/login.component';
import { CadastroComponent } from 'src/app/acesso/cadastro/cadastro.component';
import { CadastroClienteComponent } from 'src/app/acesso/cadastro/cadastro-cliente/cadastro-cliente.component';
import { CadastroPrestadorComponent } from 'src/app/acesso/cadastro/cadastro-prestador/cadastro-prestador.component';
import { AvaliacaoComponent } from 'src/app/avaliacoes/avaliacao/avaliacao.component'
import { ListaServicosDetalhadosComponent } from 'src/app/lista-servicos-detalhados/lista-servicos-detalhados.component';
import { PerfilComponent } from 'src/app/perfis/perfil/perfil.component';
import { PrestadorComponent } from 'src/app/prestador/prestador.component';

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