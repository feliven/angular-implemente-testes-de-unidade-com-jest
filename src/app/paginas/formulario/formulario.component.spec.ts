import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';

import { FormularioComponent } from '../formulario/formulario.component';
import { LivroService } from '../../services/livro.service';

describe('FormularioComponent', () => {
  let componente: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;
  let service: LivroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormularioComponent, ReactiveFormsModule],
      providers: [LivroService, FormBuilder, provideRouter([])],
    });
    fixture = TestBed.createComponent(FormularioComponent);
    componente = fixture.componentInstance;

    service = TestBed.inject(LivroService);
    fixture = TestBed.createComponent(FormularioComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deveria inicializar formulário com valores vazios', () => {
    expect(componente.formulario.value).toEqual({
      titulo: '',
      autoria: '',
      imagem: '',
      genero: '',
      dataLeitura: '',
      classificacao: null,
    });
  });

  it('deveria adicionar um novo livro', () => {
    const novoLivro = {
      titulo: 'Novo Livro',
      autoria: 'Autoria Desconhecida',
      imagem: 'http://example.com/cover.jpg',
      genero: 'romance',
      dataLeitura: '2024-04-19',
      classificacao: 5,
    };

    const adicionarLivroServiceSpy = jest.spyOn(service, 'adicionarLivro');
    const routerSpy = jest.spyOn(componente['router'], 'navigate');

    componente.formulario.setValue(novoLivro);
    componente.adicionarLivro();

    expect(adicionarLivroServiceSpy).toHaveBeenCalledWith({
      ...novoLivro,
      genero: componente.generos.find((g) => g.id === novoLivro.genero),
    });

    expect(componente.formulario.value).toEqual({
      titulo: null,
      autoria: null,
      imagem: null,
      genero: null,
      dataLeitura: null,
      classificacao: null,
    });

    expect(routerSpy).toHaveBeenCalledWith(['lista-livros']);
  });

  //   it('', () => {});
  //   it('', () => {});
  //   it('', () => {});
});
