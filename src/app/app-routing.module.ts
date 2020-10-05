import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './acesso/login/login.component';
import { PerfilPrestadorComponent } from './perfil-prestador/perfil-prestador.component';
import { PrestadorServicoComponent } from './prestador-servico/prestador-servico.component';


const routes: Routes = [
  {path: 'perfil', component: PerfilUsuarioComponent},
  {path: 'login', component: LoginComponent},
  {path: 'prestador', component: PerfilPrestadorComponent},
  {path: 'prestador-servico', component: PrestadorServicoComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
