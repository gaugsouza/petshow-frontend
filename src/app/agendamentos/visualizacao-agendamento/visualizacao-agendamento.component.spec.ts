import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizacaoAgendamentoComponent } from './visualizacao-agendamento.component';

describe('VisualizacaoAgendamentoComponent', () => {
  let component: VisualizacaoAgendamentoComponent;
  let fixture: ComponentFixture<VisualizacaoAgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizacaoAgendamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizacaoAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
