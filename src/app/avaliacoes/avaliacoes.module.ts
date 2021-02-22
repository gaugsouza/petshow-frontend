import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvaliacaoComponent } from 'src/app/avaliacoes/avaliacao/avaliacao.component';
import { EstrelasComponent } from 'src/app/avaliacoes/estrelas/estrelas.component';
import { FormularioComponent } from 'src/app/avaliacoes/formulario/formulario.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfigModule } from 'src/app/config/config.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { AvaliacaoAgendamentoComponent } from 'src/app/avaliacoes/avaliacao-agendamento/avaliacao-agendamento.component';

export function HttpLoaderFactory(http:HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AvaliacaoComponent,
    EstrelasComponent,
    FormularioComponent,
    AvaliacaoAgendamentoComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ConfigModule,
    MatPaginatorModule,
    MatCardModule,
  ],
  exports: [
    AvaliacaoComponent,
    EstrelasComponent,
    FormularioComponent,
    AvaliacaoAgendamentoComponent,
  ],
})
export class AvaliacoesModule { }
