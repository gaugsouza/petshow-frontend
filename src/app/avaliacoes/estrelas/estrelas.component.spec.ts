import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstrelasComponent } from './estrelas.component';
import { MatIconModule } from '@angular/material/icon';

describe('EstrelasComponent', () => {
  let component: EstrelasComponent;
  let fixture: ComponentFixture<EstrelasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstrelasComponent ],
      imports: [
        MatIconModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstrelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Deve retornar a quantidade de icones preenchidos na média', () => {
    const esperado = [ 'star', 'star', 'star', 'star_half', 'star_border' ];
    component.media = 3.5;
    expect(component.getEstrelasMediaAvaliacao()).toEqual(esperado);
  });
});
