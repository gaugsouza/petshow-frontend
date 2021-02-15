import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicoPrecoDialogComponent } from './servico-preco-dialog.component';

describe('ServicoPrecoDialogComponent', () => {
  let component: ServicoPrecoDialogComponent;
  let fixture: ComponentFixture<ServicoPrecoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicoPrecoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicoPrecoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
