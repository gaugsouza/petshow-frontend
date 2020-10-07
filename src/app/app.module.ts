import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { HomeComponent } from './home/home.component';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { AnimalEstimacaoComponent } from './perfil-usuario/animal-estimacao/animal-estimacao.component';
import { FormularioAnimalComponent } from './perfil-usuario/animal-estimacao/formulario-animal/formulario-animal.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './database-mock/in-memory-data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './acesso/login/login.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AvaliacaoComponent } from './avaliacao/avaliacao.component';
import { EstrelasComponent } from './avaliacao/estrelas/estrelas.component';
import { FormularioComponent } from './avaliacao/formulario/formulario.component';
import { InformacoesPessoaisComponent } from './perfil-usuario/informacoes-pessoais/informacoes-pessoais.component';
import { EnderecoComponent } from './perfil-usuario/endereco/endereco.component';
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatCardModule} from '@angular/material/card';
import { DialogEnderecoComponent } from './perfil-usuario/endereco/dialog-endereco/dialog-endereco.component';
import {MatDialogModule} from '@angular/material/dialog'; 
import {NgxMaskModule} from 'ngx-mask';

import { ListaServicosDetalhadosComponent } from './lista-servicos-detalhados/lista-servicos-detalhados.component';
import { PerfilPrestadorComponent } from './perfil-prestador/perfil-prestador.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ServicosComponent } from './perfil-prestador/servicos/servicos.component';
import { FormularioServicoComponent } from './perfil-prestador/formulario-servico/formulario-servico.component';
import { PrestadorComponent } from './prestador/prestador.component';

export function HttpLoaderFactory(http:HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    PerfilUsuarioComponent,
    HomeComponent,
    AnimalEstimacaoComponent,
    FormularioAnimalComponent,
    LoginComponent,
    AvaliacaoComponent,
    EstrelasComponent,
    FormularioComponent,
    ListaServicosDetalhadosComponent,
    PerfilPrestadorComponent,
    PerfilComponent,
    ServicosComponent,
    FormularioServicoComponent,
    InformacoesPessoaisComponent,
    EnderecoComponent,
    DialogEnderecoComponent,
    PrestadorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,
      disableConsoleLogging: true,
      httpResponseType: 'json',
      timestampFormat: "shortDate",
      serverLoggingUrl: '/server/logger',
    }),
    HttpClientModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    // environment.production ? [] : HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, {dataEncapsulation: false},
    // ),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'pt'
    }),
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
