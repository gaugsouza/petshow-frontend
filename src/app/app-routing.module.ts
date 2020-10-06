import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './acesso/login/login.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { CadastroClienteComponent } from './acesso/cadastro/cadastro-cliente/cadastro-cliente.component';
import { CadastroPrestadorComponent } from './acesso/cadastro/cadastro-prestador/cadastro-prestador.component';

const routes: Routes = [
  {path: 'perfil', component: PerfilUsuarioComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cadastro-tipo', component: CadastroComponent},  
  {path: 'cadastro-cliente', component: CadastroClienteComponent},
  {path: 'cadastro-prestador', component: CadastroPrestadorComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule { }