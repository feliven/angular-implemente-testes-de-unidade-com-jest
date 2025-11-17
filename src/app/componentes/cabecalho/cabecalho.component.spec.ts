import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabecalhoComponent } from './cabecalho.component';

describe('CabecalhoComponent', () => {
  let componente: CabecalhoComponent;
  let fixture: ComponentFixture<CabecalhoComponent>;

  beforeEach(() => {
    TestBed.runInInjectionContext(() => {
      componente = new CabecalhoComponent();
    });
    fixture = TestBed.createComponent(CabecalhoComponent);
    componente = fixture.componentInstance;
  });

  it('deveria ser criado', () => {
    expect(componente).toBeTruthy();
  });

  it('deveria definir propriedades alt e src', () => {
    expect(componente.alt).toBeDefined();
    expect(componente.src).toBeDefined();
  });
});
