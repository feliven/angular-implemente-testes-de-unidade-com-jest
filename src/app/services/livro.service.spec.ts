import { GeneroLiterario, Livro } from '../componentes/livro/livro';
import { ErroGeneroLiterario, LivroService } from './livro.service';
import { livrosMockados } from '../mock-livros';
import { TestBed } from '@angular/core/testing';

describe('LivroService', () => {
  let service: LivroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LivroService],
    });
    service = TestBed.inject(LivroService);
  });

  // AAA = arrange, act, assert

  it('deveria ser criado', () => {
    // service = new LivroService();
    expect(service).toBeTruthy();
  });

  it('deveria adicionar um novo livro', () => {
    // service = new LivroService();

    const novoLivro: Livro = {
      titulo: 'Novo Livro',
      autoria: 'Autor Desconhecido',
      imagem: 'http://example.com/cover.jpg',
      genero: { id: 'romance', value: 'Romance' },
      dataLeitura: '2024-04-19',
      classificacao: 5,
    };

    service.adicionarLivro(novoLivro);

    const livrosPorGenero = service.obterLivrosPorGenero('romance');

    expect(livrosPorGenero).toContain(novoLivro);
  });

  it('deveria recuperar livros por gênero', () => {
    // service = new LivroService();

    const livrosPorGenero = service.obterLivrosPorGenero('romance');
    const livrosEsperados = livrosMockados.filter(
      (livro) => livro.genero.id === 'romance'
    );

    expect(livrosPorGenero).toEqual(livrosEsperados);
  });

  it('deveria inicializar os gêneros corretamente', () => {
    const generosEsperados: GeneroLiterario[] = [
      {
        id: 'romance',
        value: 'Romance',
      },
      {
        id: 'misterio',
        value: 'Mistério',
      },
      {
        id: 'fantasia',
        value: 'Fantasia',
      },
      {
        id: 'ficcao-cientifica',
        value: 'Ficção Científica',
      },
      {
        id: 'tecnicos',
        value: 'Técnicos',
      },
    ];

    expect(service.generos).toEqual(generosEsperados);
  });

  it('deveria lançar erro se livro tiver gênero desconhecido', () => {
    const novoLivro: Livro = {
      titulo: 'Novo Livro',
      autoria: 'Autor Desconhecido',
      imagem: 'http://example.com/cover.jpg',
      genero: { id: 'romances', value: 'Romances' },
      dataLeitura: '2024-04-19',
      classificacao: 5,
    };

    expect(() => {
      service.adicionarLivro(novoLivro);
    }).toThrow(ErroGeneroLiterario);
  });

  // ----------------------

  it('deveria retornar array vazio para gênero inexistente', () => {
    const resultado = service.obterLivrosPorGenero('inexistente');
    expect(Array.isArray(resultado)).toBe(true);
    expect(resultado).toHaveLength(0);
  });

  it('deveria retornar nova instância de array vazio em chamadas repetidas para gênero inexistente', () => {
    const a1 = service.obterLivrosPorGenero('x');
    const a2 = service.obterLivrosPorGenero('x');
    expect(a1).toHaveLength(0);
    expect(a2).toHaveLength(0);
    expect(a1).not.toBe(a2); // garante novo []
  });

  it('modificar array vazio retornado não deve afetar estado interno', () => {
    const arr = service.obterLivrosPorGenero('desconhecido');
    arr.push({
      titulo: 'Teste',
      autoria: 'Autor',
      imagem: '',
      genero: { id: 'desconhecido', value: 'Desconhecido' },
      dataLeitura: '2024-01-01',
      classificacao: 1,
    } as Livro);
    expect(arr).toHaveLength(1);
    const segundaChamada = service.obterLivrosPorGenero('desconhecido');
    expect(segundaChamada).toHaveLength(0);
  });

  it('deveria retornar mesma referência para gênero existente e refletir adições', () => {
    const antes = service.obterLivrosPorGenero('romance');
    const tamanhoAntes = antes.length;
    const novoLivro: Livro = {
      titulo: 'Outro Romance',
      autoria: 'Alguém',
      imagem: '',
      genero: { id: 'romance', value: 'Romance' },
      dataLeitura: '2024-05-01',
      classificacao: 4,
    };
    service.adicionarLivro(novoLivro);
    const depois = service.obterLivrosPorGenero('romance');
    expect(depois).toBe(antes);
    expect(depois.length).toBe(tamanhoAntes + 1);
    expect(depois).toContain(novoLivro);
  });

  it('não deve criar entrada no mapa para gênero inexistente via obterLivrosPorGenero', () => {
    service.obterLivrosPorGenero('foo-bar-baz');
    const resultadoDepois = service.obterLivrosPorGenero('foo-bar-baz');
    expect(resultadoDepois).toHaveLength(0);
  });
});
