import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './acesso/login/login.component';
import { ListaServicosDetalhadosComponent } from './lista-servicos-detalhados/lista-servicos-detalhados.component';

const routes: Routes = [
  {path: 'perfil', component: PerfilUsuarioComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent},
  {path: 'servico-detalhado', component: ListaServicosDetalhadosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
