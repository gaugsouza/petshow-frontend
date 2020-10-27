import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EnderecoCadastroComponent } from './cadastro/endereco-cadastro/endereco-cadastro.component';
import { InfoPessoalCadastroComponent } from './cadastro/info-pessoal-cadastro/info-pessoal-cadastro.component';
import { CadastroClienteComponent } from './cadastro/cadastro-cliente/cadastro-cliente.component';
import { CadastroPrestadorComponent } from './cadastro/cadastro-prestador/cadastro-prestador.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    LoginComponent, 
    CadastroComponent,
    EnderecoCadastroComponent, 
    InfoPessoalCadastroComponent, 
    CadastroClienteComponent, 
    CadastroPrestadorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'pt'
    }),
    NgxMaskModule.forRoot(),
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,
      disableConsoleLogging: true,
      httpResponseType: 'json',
      timestampFormat: "shortDate",
      serverLoggingUrl: '/server/logger',
    }),
  ],
  exports: [
    LoginComponent, 
    CadastroComponent,
    EnderecoCadastroComponent, 
    InfoPessoalCadastroComponent, 
    CadastroClienteComponent, 
    CadastroPrestadorComponent
  ]
})
export class AcessoModule { }
