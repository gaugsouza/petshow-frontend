import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './acesso/login/login.component';
import { PerfilPrestadorComponent } from './perfil-prestador/perfil-prestador.component';

const routes: Routes = [
  {path: 'perfil', component: PerfilUsuarioComponent},
  {path: 'login', component: LoginComponent},
  {path: 'prestador', component: PerfilPrestadorComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
