import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core/';
import { AvaliacoesModule } from 'src/app/avaliacoes/avaliacoes.module';
import { DadosAgendamentoComponent } from 'src/app/agendamentos/dados-agendamento/dados-agendamento.component';
import { ConfirmacaoAgendamentoComponent } from 'src/app/agendamentos/confirmacao-agendamento/confirmacao-agendamento.component';
import { VisualizacaoAgendamentoComponent } from 'src/app/agendamentos/visualizacao-agendamento/visualizacao-agendamento.component';
import { ConfigModule } from 'src/app/config/config.module';
import { ClienteComponent } from 'src/app/agendamentos/cliente/cliente.component';
import { ServicoDetalhadoComponent } from 'src/app/agendamentos/servico-detalhado/servico-detalhado.component';
import { AnimalEstimacaoComponent } from 'src/app/agendamentos/animal-estimacao/animal-estimacao.component';
import { AgendamentoComponent } from 'src/app/agendamentos/agendamento/agendamento.component';
import { MatSelectModule } from '@angular/material/select'; 
export function HttpLoaderFactory(http:HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AgendamentoComponent,
    AnimalEstimacaoComponent,
    ServicoDetalhadoComponent,
    ClienteComponent,
    DadosAgendamentoComponent,
    ConfirmacaoAgendamentoComponent,
    VisualizacaoAgendamentoComponent,
  ],
  imports: [
    CommonModule,
    ConfigModule,
    MatPaginatorModule,
    MatListModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatTabsModule,
    MatStepperModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AvaliacoesModule,
    MatSelectModule,
  ],
  exports: [
    AgendamentoComponent,
    AnimalEstimacaoComponent,
    ServicoDetalhadoComponent,
    ClienteComponent,
  ],
  providers: [
    MatNativeDateModule,
  ],
})

export class AgendamentosModule { }
