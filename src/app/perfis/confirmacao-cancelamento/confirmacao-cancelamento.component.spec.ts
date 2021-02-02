import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacaoCancelamentoComponent } from './confirmacao-cancelamento.component';

describe('ConfirmacaoCancelamentoComponent', () => {
  let component: ConfirmacaoCancelamentoComponent;
  let fixture: ComponentFixture<ConfirmacaoCancelamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmacaoCancelamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacaoCancelamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
