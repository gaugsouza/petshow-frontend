import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestadorComponent } from './prestador.component';
import { PrestadorService } from '../servicos/prestador.service';
import { LocalStorageService } from '../servicos/local-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';

describe('PrestadorComponent', () => {
  let component: PrestadorComponent;
  let fixture: ComponentFixture<PrestadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestadorComponent ],
      providers: [
        PrestadorService,
        LocalStorageService,
        {provide: Router, useValue: {navigate:() => true}},
        {provide: ActivatedRoute, useValue: {
          queryParams: of({
            servicoAvaliado: 1,
            prestador: 1,
            idPrestador: 1
          })
        }}
      ],
      imports: [
        MatListModule,
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        LoggerTestingModule,
        FormsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatIconModule,
        TranslateModule.forRoot(),
        MatCardModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
