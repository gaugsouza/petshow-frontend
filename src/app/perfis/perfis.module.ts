import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PerfilPrestadorComponent } from 'src/app/perfis/perfil-prestador/perfil-prestador.component';
import { PerfilComponent } from 'src/app/perfis/perfil/perfil.component';
import { PerfilUsuarioComponent } from 'src/app/perfis/perfil-usuario/perfil-usuario.component';
import { ServicosComponent } from 'src/app/perfis/servicos/servicos.component';
import { FormularioServicoComponent } from 'src/app/perfis/formulario-servico/formulario-servico.component';
import { InformacoesPessoaisComponent } from 'src/app/perfis/informacoes-pessoais/informacoes-pessoais.component';
import { EnderecoComponent } from 'src/app/perfis/endereco/endereco.component';
import { EnderecoDialogComponent } from 'src/app/perfis/endereco-dialog/endereco-dialog.component';
import { AnimalEstimacaoComponent } from 'src/app/perfis/animal-estimacao/animal-estimacao.component';
import { FormularioAnimalComponent } from 'src/app/perfis/formulario-animal/formulario-animal.component';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfigModule } from 'src/app/config/config.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MensagemAtivacaoComponent } from 'src/app/perfis/mensagem-ativacao/mensagem-ativacao.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CadastroAdicionalComponent } from 'src/app/perfis/cadastro-adicional/cadastro-adicional.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';

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
    FormularioAnimalComponent,
    MensagemAtivacaoComponent,
    CadastroAdicionalComponent,
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
    MatPaginatorModule,
    MatTooltipModule,
    MatExpansionModule,
    MatChipsModule,
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
    FormularioAnimalComponent,
  ],
})
export class PerfisModule { }
