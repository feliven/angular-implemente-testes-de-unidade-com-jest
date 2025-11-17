import { TestBed } from '@angular/core/testing';

import { CabecalhoComponent } from './cabecalho.component';

describe('CabecalhoComponent', () => {
  let componente: CabecalhoComponent;

  beforeEach(() => {
    TestBed.runInInjectionContext(() => {
      componente = new CabecalhoComponent();
    });
  });

  it('deveria ser criado', () => {
    expect(componente).toBeTruthy();
  });
});
