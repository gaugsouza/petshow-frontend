import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosAgendamentoComponent } from './dados-agendamento.component';

describe('DadosAgendamentoComponent', () => {
  let component: DadosAgendamentoComponent;
  let fixture: ComponentFixture<DadosAgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosAgendamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
