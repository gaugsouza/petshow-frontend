import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/acesso/login/login.component';
import { CadastroComponent } from 'src/app/acesso/cadastro/cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EnderecoCadastroComponent } from 'src/app/acesso/cadastro/endereco-cadastro/endereco-cadastro.component';
import { InfoPessoalCadastroComponent } from 'src/app/acesso/cadastro/info-pessoal-cadastro/info-pessoal-cadastro.component';
import { HttpClient } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CadastroContaComponent } from 'src/app/acesso/cadastro/cadastro-conta/cadastro-conta.component';
import { ConfigModule } from 'src/app/config/config.module';
import { PoliticaPrivacidadeComponent } from 'src/app/acesso/cadastro/politica-privacidade/politica-privacidade.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SucessoCadastroComponent } from 'src/app/acesso/sucesso-cadastro/sucesso-cadastro.component';
import { TokenAtivacaoComponent } from 'src/app/acesso/token-ativacao/token-ativacao.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CadastroEmpresaComponent } from './cadastro-empresa/cadastro-empresa.component';

export function HttpLoaderFactory(http:HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    LoginComponent,
    CadastroComponent,
    EnderecoCadastroComponent,
    InfoPessoalCadastroComponent,
    PoliticaPrivacidadeComponent,
    CadastroContaComponent,
    SucessoCadastroComponent,
    TokenAtivacaoComponent,
    CadastroEmpresaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    ConfigModule,
    MatDialogModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  exports: [
    LoginComponent,
    CadastroComponent,
    EnderecoCadastroComponent,
    InfoPessoalCadastroComponent,
    CadastroContaComponent,
  ],
})
export class AcessoModule { }
