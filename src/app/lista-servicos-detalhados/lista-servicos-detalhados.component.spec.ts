import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaServicosDetalhadosComponent } from './lista-servicos-detalhados.component';

describe('ListaServicosDetalhadosComponent', () => {
  let component: ListaServicosDetalhadosComponent;
  let fixture: ComponentFixture<ListaServicosDetalhadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaServicosDetalhadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaServicosDetalhadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
