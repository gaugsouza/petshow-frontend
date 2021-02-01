import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { AnimalEstimacaoComponent } from './animal-estimacao/animal-estimacao.component';
import { ServicoDetalhadoComponent } from './servico-detalhado/servico-detalhado.component';
import { ClienteComponent } from './cliente/cliente.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ConfigModule } from '../config/config.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input'; 
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { DadosAgendamentoComponent } from './dados-agendamento/dados-agendamento.component';
import { ConfirmacaoAgendamentoComponent } from './confirmacao-agendamento/confirmacao-agendamento.component';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core/';
import { VisualizacaoAgendamentoComponent } from './visualizacao-agendamento/visualizacao-agendamento.component';
import { AvaliacoesModule } from 'src/app/avaliacoes/avaliacoes.module';


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
  ],
  exports: [
    AgendamentoComponent,
    AnimalEstimacaoComponent,
    ServicoDetalhadoComponent,
    ClienteComponent,
  ],
  providers: [
    MatNativeDateModule,
  ]
})

export class AgendamentosModule { }
