import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensagemAtivacaoComponent } from './mensagem-ativacao.component';

describe('MensagemAtivacaoComponent', () => {
  let component: MensagemAtivacaoComponent;
  let fixture: ComponentFixture<MensagemAtivacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensagemAtivacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensagemAtivacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
