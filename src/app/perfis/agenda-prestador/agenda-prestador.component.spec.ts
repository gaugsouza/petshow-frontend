import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaPrestadorComponent } from './agenda-prestador.component';

describe('AgendaPrestadorComponent', () => {
  let component: AgendaPrestadorComponent;
  let fixture: ComponentFixture<AgendaPrestadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaPrestadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaPrestadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
