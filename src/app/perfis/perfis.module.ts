import { AgendaClienteComponent } from 'src/app/perfis/agenda-cliente/agenda-cliente.component';
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
import { AgendaPrestadorComponent } from 'src/app/perfis/agenda-prestador/agenda-prestador.component';
import { AgendamentoService } from 'src/app/servicos/agendamento.service';
import { CadastroAdicionalComponent } from 'src/app/perfis/cadastro-adicional/cadastro-adicional.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { ConfirmationDialogComponent } from 'src/app/perfis/confirmation-dialog/confirmation-dialog.component';
import { AdicionalDialogComponent } from 'src/app/perfis/adicional-dialog/adicional-dialog.component';
import { ConfirmacaoCancelamentoComponent } from 'src/app/perfis/confirmacao-cancelamento/confirmacao-cancelamento.component';
import { ServicoPrecoDialogComponent } from 'src/app/perfis/servico-preco-dialog/servico-preco-dialog.component';

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
    AgendaPrestadorComponent,
    CadastroAdicionalComponent,
    AdicionalDialogComponent,
    ConfirmationDialogComponent,
    AgendaClienteComponent,
    ConfirmacaoCancelamentoComponent,
    ServicoPrecoDialogComponent,
  ],
  entryComponents: [
    ConfirmacaoCancelamentoComponent,
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
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTabsModule,
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
    ConfirmacaoCancelamentoComponent,
  ],
  providers: [AgendamentoService],
})
export class PerfisModule { }
