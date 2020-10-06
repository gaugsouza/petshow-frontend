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
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { CadastroPrestadorComponent } from './acesso/cadastro/cadastro-prestador/cadastro-prestador.component';
import { CadastroClienteComponent } from './acesso/cadastro/cadastro-cliente/cadastro-cliente.component';
<<<<<<< HEAD
import { AvaliacaoComponent } from './avaliacao/avaliacao.component';
import { EstrelasComponent } from './avaliacao/estrelas/estrelas.component';
import { FormularioComponent } from './avaliacao/formulario/formulario.component';

import { ListaServicosDetalhadosComponent } from './lista-servicos-detalhados/lista-servicos-detalhados.component';
=======
>>>>>>> 0191104da072bae8d4834cf7da09d0ddecd0228e

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
    CadastroComponent,
    CadastroPrestadorComponent,
    CadastroClienteComponent,
<<<<<<< HEAD
    AvaliacaoComponent,
    EstrelasComponent,
    FormularioComponent,
    ListaServicosDetalhadosComponent,
=======
>>>>>>> 0191104da072bae8d4834cf7da09d0ddecd0228e
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
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
