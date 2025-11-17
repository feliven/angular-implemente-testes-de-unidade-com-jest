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

  it('deveria renderizar conteúdo com base em src e alt', () => {
    fixture.componentRef.setInput('src', 'https://example.com/test-image.jpg');
    fixture.componentRef.setInput('alt', 'Imagem teste');
    fixture.detectChanges();
    expect(componente).toMatchSnapshot();
  });

  it('deveria retornar undefined quando src não é fornecido', () => {
    expect(componente.src()).toBeUndefined();
  });

  it('deveria retornar undefined quando alt não é fornecido', () => {
    expect(componente.alt()).toBeUndefined();
  });

  it('deveria retornar o valor correto quando src é fornecido', () => {
    fixture.componentRef.setInput('src', 'https://example.com/image.jpg');
    expect(componente.src()).toBe('https://example.com/image.jpg');
  });

  it('deveria retornar o valor correto quando alt é fornecido', () => {
    fixture.componentRef.setInput('alt', 'Descrição da imagem');
    expect(componente.alt()).toBe('Descrição da imagem');
  });

  it('deveria atualizar os valores de entrada dinamicamente', () => {
    fixture.componentRef.setInput('src', 'url-inicial.jpg');
    expect(componente.src()).toBe('url-inicial.jpg');

    fixture.componentRef.setInput('src', 'url-atualizada.jpg');
    expect(componente.src()).toBe('url-atualizada.jpg');
  });

  it('deveria aceitar strings vazias como valores válidos', () => {
    fixture.componentRef.setInput('src', '');
    fixture.componentRef.setInput('alt', '');
    expect(componente.src()).toBe('');
    expect(componente.alt()).toBe('');
  });
});
