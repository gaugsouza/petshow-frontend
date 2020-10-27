import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AcessoModule } from 'src/app/acesso/acesso.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import { HomeComponent } from 'src/app/home/home.component';
import {MatSidenavModule} from '@angular/material/sidenav';  
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {MatCardModule} from '@angular/material/card'; 
import {NgxMaskModule} from 'ngx-mask';
import { ListaServicosDetalhadosComponent } from 'src/app/lista-servicos-detalhados/lista-servicos-detalhados.component';
import { PrestadorComponent } from 'src/app/prestador/prestador.component';
import { JwtHelper } from 'src/app/util/jwt-helper';
import { PerfisModule } from 'src/app/perfis/perfis.module';
import { DataSharingService } from './servicos/data-sharing.service';
import { AvaliacoesModule } from './avaliacoes/avaliacoes.module';

export function HttpLoaderFactory(http:HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListaServicosDetalhadosComponent,
    PrestadorComponent,
  ],
  imports: [
    AcessoModule,
    PerfisModule,
    BrowserModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatInputModule,
    AvaliacoesModule,
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
    MatCardModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    JwtHelper,
    DataSharingService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
