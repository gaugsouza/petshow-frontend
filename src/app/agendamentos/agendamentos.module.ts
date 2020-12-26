import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { AnimalEstimacaoComponent } from './animal-estimacao/animal-estimacao.component';
import { ServicoDetalhadoComponent } from './servico-detalhado/servico-detalhado.component';
import { ClienteComponent } from './cliente/cliente.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http:HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AgendamentoComponent,
    AnimalEstimacaoComponent,
    ServicoDetalhadoComponent,
    ClienteComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AgendamentoComponent,
    AnimalEstimacaoComponent,
    ServicoDetalhadoComponent,
    ClienteComponent,
  ]
})

export class AgendamentosModule { }
