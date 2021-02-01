import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoAgendamentoComponent } from './avaliacao-agendamento.component';

describe('AvaliacaoAgendamentoComponent', () => {
  let component: AvaliacaoAgendamentoComponent;
  let fixture: ComponentFixture<AvaliacaoAgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvaliacaoAgendamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliacaoAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
