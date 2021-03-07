import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNegociacaoComponent } from './modal-negociacao.component';

describe('ModalNegociacaoComponent', () => {
  let component: ModalNegociacaoComponent;
  let fixture: ComponentFixture<ModalNegociacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNegociacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNegociacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
