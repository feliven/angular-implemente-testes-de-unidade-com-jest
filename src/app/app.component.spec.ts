import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let componente: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule],
    });

    fixture = TestBed.createComponent(AppComponent);
    componente = fixture.componentInstance;
  });

  it('deveria ser criado', () => {
    expect(componente).toBeTruthy();
  });

  it('deveria ter o título "organo"', () => {
    expect(componente.title).toBe('organo');
  });

  it('deveria ter a propriedade title definida', () => {
    expect(componente.title).toBeDefined();
  });

  it('deveria renderizar o componente com snapshot', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('deveria permitir modificar o título', () => {
    componente.title = 'novo-titulo';
    expect(componente.title).toBe('novo-titulo');
  });

  it('deveria aceitar string vazia como título', () => {
    componente.title = '';
    expect(componente.title).toBe('');
  });

  it('deveria ter o tipo de title como string', () => {
    expect(typeof componente.title).toBe('string');
  });

  it('deveria manter o valor do título após detectChanges', () => {
    const tituloOriginal = componente.title;
    fixture.detectChanges();
    expect(componente.title).toBe(tituloOriginal);
  });

  it('deveria conter router-outlet no template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const routerOutlet = compiled.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });

  it('deveria conter o componente de cabecalho no template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const cabecalho = compiled.querySelector('app-cabecalho');
    expect(cabecalho).toBeTruthy();
  });

  it('deveria conter o componente de rodape no template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const rodape = compiled.querySelector('app-rodape');
    expect(rodape).toBeTruthy();
  });

  it('deveria aceitar títulos com caracteres especiais', () => {
    componente.title = 'organo-2024!@#$%';
    expect(componente.title).toBe('organo-2024!@#$%');
  });

  it('deveria aceitar título com espaços', () => {
    componente.title = 'Organo App 2024';
    expect(componente.title).toBe('Organo App 2024');
  });
});
