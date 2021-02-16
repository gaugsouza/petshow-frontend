import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AcessoModule } from 'src/app/acesso/acesso.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { HomeComponent } from 'src/app/home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ListaServicosDetalhadosComponent } from 'src/app/lista-servicos-detalhados/lista-servicos-detalhados.component';
import { PrestadorComponent } from 'src/app/prestador/prestador.component';
import { JwtHelper } from 'src/app/util/jwt-helper';
import { PerfisModule } from 'src/app/perfis/perfis.module';
import { DataSharingService } from 'src/app/servicos/data-sharing.service';
import { AvaliacoesModule } from 'src/app/avaliacoes/avaliacoes.module';
import { ConfigModule } from 'src/app/config/config.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NotificationService } from 'src/app/servicos/notification.service';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { AnimalEstimacao } from 'src/app/interfaces/animalEstimacao';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, NativeDateModule, MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';
import { DialogComparacaoComponent } from './lista-servicos-detalhados/dialog-comparacao/dialog-comparacao.component';
import { Agendamento } from './interfaces/agendamento';
import { AgendamentosModule } from './agendamentos/agendamentos.module';
import { MatTabsModule } from '@angular/material/tabs';
import { ErrorDialogComponent } from './confirmation-dialog/error-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListaServicosDetalhadosComponent,
    PrestadorComponent,
    DialogComparacaoComponent,
    ErrorDialogComponent,
  ],
  imports: [
    AcessoModule,
    PerfisModule,
    BrowserModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatInputModule,
    AvaliacoesModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    ConfigModule,
    MatPaginatorModule,
    AgendamentosModule,
    MatCheckboxModule,
    MatChipsModule,
    MatSelectModule,
    MatDividerModule,
    MatDialogModule,
    MatTableModule,
    MatDatepickerModule,
    NativeDateModule,
    MatTabsModule,
  ],
  providers: [
    JwtHelper,
    DataSharingService,
    { provide: 'ServicoNotificationService', useFactory: () => (new NotificationService<ServicoDetalhado>()) },
    { provide: 'AnimalNotificationService', useFactory: () => (new NotificationService<AnimalEstimacao>()) },
    { provide: 'AgendamentoNotificationService', useFactory: () => (new NotificationService<Agendamento>()) },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
