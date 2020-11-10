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
import { SucessoCadastroComponent } from './sucesso-cadastro/sucesso-cadastro.component';
import { TokenAtivacaoComponent } from './token-ativacao/token-ativacao.component';

export function HttpLoaderFactory(http:HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    LoginComponent, 
    CadastroComponent,
    EnderecoCadastroComponent, 
    InfoPessoalCadastroComponent, 
    CadastroContaComponent, SucessoCadastroComponent, TokenAtivacaoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    ConfigModule
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
