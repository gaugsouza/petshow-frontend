import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PerfilPrestadorComponent } from './perfil-prestador/perfil-prestador.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { ServicosComponent } from './servicos/servicos.component';
import { FormularioServicoComponent } from './formulario-servico/formulario-servico.component';
import { InformacoesPessoaisComponent } from './informacoes-pessoais/informacoes-pessoais.component';
import { EnderecoComponent } from './endereco/endereco.component';
import { EnderecoDialogComponent } from './endereco-dialog/endereco-dialog.component';
import { AnimalEstimacaoComponent } from './animal-estimacao/animal-estimacao.component';
import { FormularioAnimalComponent } from './formulario-animal/formulario-animal.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list'; 
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfigModule } from '../config/config.module';
import { MatPaginatorModule } from '@angular/material/paginator';

export function HttpLoaderFactory(http:HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    PerfilPrestadorComponent, 
    PerfilComponent, 
    PerfilUsuarioComponent, 
    ServicosComponent, 
    FormularioServicoComponent, 
    InformacoesPessoaisComponent, 
    EnderecoComponent, 
    EnderecoDialogComponent, 
    AnimalEstimacaoComponent, 
    FormularioAnimalComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    ConfigModule,
    MatPaginatorModule
  ],
  exports: [
    PerfilPrestadorComponent, 
    PerfilComponent, 
    PerfilUsuarioComponent, 
    ServicosComponent, 
    FormularioServicoComponent, 
    InformacoesPessoaisComponent, 
    EnderecoComponent, 
    EnderecoDialogComponent, 
    AnimalEstimacaoComponent, 
    FormularioAnimalComponent
  ]
})
export class PerfisModule { }
