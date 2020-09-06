import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalEstimacaoComponent } from './animal-estimacao.component';

describe('AnimalEstimacaoComponent', () => {
  let component: AnimalEstimacaoComponent;
  let fixture: ComponentFixture<AnimalEstimacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalEstimacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalEstimacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
