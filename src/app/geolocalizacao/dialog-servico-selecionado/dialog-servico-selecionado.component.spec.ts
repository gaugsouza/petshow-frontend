import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogServicoSelecionadoComponent } from './dialog-servico-selecionado.component';

describe('DialogServicoSelecionadoComponent', () => {
  let component: DialogServicoSelecionadoComponent;
  let fixture: ComponentFixture<DialogServicoSelecionadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogServicoSelecionadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogServicoSelecionadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
