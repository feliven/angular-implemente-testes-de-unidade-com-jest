import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroComponent } from './livro.component';
import { Livro, GeneroLiterario } from './livro';

describe('LivroComponent', () => {
  let componente: LivroComponent;
  let fixture: ComponentFixture<LivroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LivroComponent],
    });

    fixture = TestBed.createComponent(LivroComponent);
    componente = fixture.componentInstance;
  });

  it('deveria ser criado', () => {
    expect(componente).toBeTruthy();
  });

  it('deveria definir propriedade livro', () => {
    expect(componente.livro).toBeDefined();
  });

  it('deveria retornar undefined quando livro não é fornecido', () => {
    expect(componente.livro()).toBeUndefined();
  });

  it('deveria retornar o valor correto quando livro é fornecido', () => {
    const livroMock: Livro = {
      titulo: 'O Senhor dos Anéis',
      autoria: 'J.R.R. Tolkien',
      imagem: 'https://example.com/livro.jpg',
      genero: { id: '1', value: 'Fantasia' },
      dataLeitura: '2024-01-15',
      classificacao: 5,
    };

    fixture.componentRef.setInput('livro', livroMock);
    expect(componente.livro()).toEqual(livroMock);
  });

  it('deveria atualizar o valor de livro dinamicamente', () => {
    const livro1: Livro = {
      titulo: 'Livro 1',
      autoria: 'Autor 1',
      imagem: 'imagem1.jpg',
      genero: { id: '1', value: 'Romance' },
      dataLeitura: '2024-01-01',
      classificacao: 4,
    };

    const livro2: Livro = {
      titulo: 'Livro 2',
      autoria: 'Autor 2',
      imagem: 'imagem2.jpg',
      genero: { id: '2', value: 'Ficção' },
      dataLeitura: '2024-02-01',
      classificacao: 5,
    };

    fixture.componentRef.setInput('livro', livro1);
    expect(componente.livro()).toEqual(livro1);

    fixture.componentRef.setInput('livro', livro2);
    expect(componente.livro()).toEqual(livro2);
  });

  it('deveria renderizar conteúdo com base em livro', () => {
    const livroMock: Livro = {
      titulo: 'Clean Code',
      autoria: 'Robert C. Martin',
      imagem: 'https://example.com/clean-code.jpg',
      genero: { id: '3', value: 'Tecnologia' },
      dataLeitura: '2024-03-10',
      classificacao: 5,
    };

    fixture.componentRef.setInput('livro', livroMock);
    fixture.detectChanges();
    expect(componente).toMatchSnapshot();
  });

  it('deveria manter o tipo de entrada como signal', () => {
    expect(typeof componente.livro).toBe('function');
  });

  it('deveria aceitar livro com classificacao zero', () => {
    const livroMock: Livro = {
      titulo: 'Livro Ruim',
      autoria: 'Autor Desconhecido',
      imagem: 'imagem.jpg',
      genero: { id: '4', value: 'Terror' },
      dataLeitura: '2024-04-01',
      classificacao: 0,
    };

    fixture.componentRef.setInput('livro', livroMock);
    expect(componente.livro()?.classificacao).toBe(0);
  });

  it('deveria aceitar titulo com caracteres especiais', () => {
    const livroMock: Livro = {
      titulo: 'O Guia do Mochileiro das Galáxias: Edição Especial!',
      autoria: 'Douglas Adams',
      imagem: 'guia.jpg',
      genero: { id: '5', value: 'Ficção Científica' },
      dataLeitura: '2024-05-20',
      classificacao: 5,
    };

    fixture.componentRef.setInput('livro', livroMock);
    expect(componente.livro()?.titulo).toBe(
      'O Guia do Mochileiro das Galáxias: Edição Especial!'
    );
  });

  it('deveria aceitar URL de imagem complexa', () => {
    const urlComplexa =
      'https://example.com/path/to/image.jpg?param=value&size=large';
    const livroMock: Livro = {
      titulo: 'Livro Teste',
      autoria: 'Autor Teste',
      imagem: urlComplexa,
      genero: { id: '6', value: 'Biografia' },
      dataLeitura: '2024-06-15',
      classificacao: 3,
    };

    fixture.componentRef.setInput('livro', livroMock);
    expect(componente.livro()?.imagem).toBe(urlComplexa);
  });

  it('deveria manter todas as propriedades do objeto livro', () => {
    const livroMock: Livro = {
      titulo: 'Harry Potter',
      autoria: 'J.K. Rowling',
      imagem: 'harry.jpg',
      genero: { id: '7', value: 'Fantasia' },
      dataLeitura: '2024-07-25',
      classificacao: 5,
    };

    fixture.componentRef.setInput('livro', livroMock);
    const livroAtual = componente.livro();

    expect(livroAtual?.titulo).toBe('Harry Potter');
    expect(livroAtual?.autoria).toBe('J.K. Rowling');
    expect(livroAtual?.imagem).toBe('harry.jpg');
    expect(livroAtual?.genero.id).toBe('7');
    expect(livroAtual?.genero.value).toBe('Fantasia');
    expect(livroAtual?.dataLeitura).toBe('2024-07-25');
    expect(livroAtual?.classificacao).toBe(5);
  });

  it('deveria aceitar diferentes formatos de data', () => {
    const livroMock: Livro = {
      titulo: 'Livro',
      autoria: 'Autor',
      imagem: 'imagem.jpg',
      genero: { id: '8', value: 'Drama' },
      dataLeitura: '15/08/2024',
      classificacao: 4,
    };

    fixture.componentRef.setInput('livro', livroMock);
    expect(componente.livro()?.dataLeitura).toBe('15/08/2024');
  });
});
