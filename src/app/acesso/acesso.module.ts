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
import { HttpClient } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CadastroContaComponent } from './cadastro/cadastro-conta/cadastro-conta.component';
import { ConfigModule } from '../config/config.module';
import { PoliticaPrivacidadeComponent } from './cadastro/politica-privacidade/politica-privacidade.component';
import { MatDialogModule } from '@angular/material/dialog';

export function HttpLoaderFactory(http:HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    LoginComponent, 
    CadastroComponent,
    EnderecoCadastroComponent, 
    InfoPessoalCadastroComponent, 
    CadastroContaComponent, 
    PoliticaPrivacidadeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    ConfigModule,
    MatDialogModule
  ],
  exports: [
    LoginComponent, 
    CadastroComponent,
    EnderecoCadastroComponent, 
    InfoPessoalCadastroComponent, 
    CadastroContaComponent
  ]
})
export class AcessoModule { }
