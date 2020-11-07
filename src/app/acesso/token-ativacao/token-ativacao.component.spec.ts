import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenAtivacaoComponent } from './token-ativacao.component';

describe('TokenAtivacaoComponent', () => {
  let component: TokenAtivacaoComponent;
  let fixture: ComponentFixture<TokenAtivacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenAtivacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenAtivacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
