import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicoDetalhadoComponent } from './servico-detalhado.component';

describe('ServicoDetalhadoComponent', () => {
  let component: ServicoDetalhadoComponent;
  let fixture: ComponentFixture<ServicoDetalhadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicoDetalhadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicoDetalhadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
