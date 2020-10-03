import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestadorServicoComponent } from './prestador-servico.component';

describe('PrestadorServicoComponent', () => {
  let component: PrestadorServicoComponent;
  let fixture: ComponentFixture<PrestadorServicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestadorServicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestadorServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
