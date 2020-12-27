import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAdicionalComponent } from './cadastro-adicional.component';

describe('CadastroAdicionalComponent', () => {
  let component: CadastroAdicionalComponent;
  let fixture: ComponentFixture<CadastroAdicionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroAdicionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroAdicionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
