import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaClienteComponent } from './agenda-cliente.component';

describe('AgendaClienteComponent', () => {
  let component: AgendaClienteComponent;
  let fixture: ComponentFixture<AgendaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
