import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilPrestadorComponent } from './perfil-prestador.component';
import { ServicosComponent } from '../servicos/servicos.component';
import { FormularioServicoComponent } from '../formulario-servico/formulario-servico.component';
import { InformacoesPessoaisComponent } from '../informacoes-pessoais/informacoes-pessoais.component';
import { EnderecoComponent } from '../endereco/endereco.component';
import { EnderecoDialogComponent } from '../endereco-dialog/endereco-dialog.component';
import { PrestadorService } from '../../servicos/prestador.service';
import { LocalStorageService } from '../../servicos/local-storage.service';
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { NgxMaskModule } from 'ngx-mask';
import { JwtHelper } from '../../util/jwt-helper';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MensagemAtivacaoComponent } from '../mensagem-ativacao/mensagem-ativacao.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificationService } from '../../servicos/notification.service';
import { ServicoDetalhado } from '../../interfaces/servico-detalhado';
import { AgendaPrestadorComponent } from '../agenda-prestador/agenda-prestador.component';
import { CadastroAdicionalComponent } from '../cadastro-adicional/cadastro-adicional.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon'; 
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { ConfigModule } from '../../config/config.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';


describe('PerfilPrestadorComponent', () => {
  let component: PerfilPrestadorComponent;
  let fixture: ComponentFixture<PerfilPrestadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        PerfilPrestadorComponent,
        ServicosComponent,
        FormularioServicoComponent,
        InformacoesPessoaisComponent,
        EnderecoComponent,
        EnderecoDialogComponent,
        MensagemAtivacaoComponent,
        AgendaPrestadorComponent,
        CadastroAdicionalComponent
       ],
       providers: [
         PrestadorService,
         LocalStorageService,
         {provide: Router, useValue: {navigate: () => true}},
         JwtHelper,
         { provide: 'ServicoNotificationService', useFactory: () => (new NotificationService<ServicoDetalhado>()) }
       ],
       imports: [
        MatExpansionModule,
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
        MatChipsModule,
        MatTableModule,
        MatPseudoCheckboxModule,
        MatIconModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatCheckboxModule,
        HttpClientTestingModule,
      ]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilPrestadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
