import { GeneroLiterario, Livro } from '../componentes/livro/livro';
import { ErroGeneroLiterario, LivroService } from './livro.service';
import { livrosMockados } from '../mock-livros';

describe('LivroService', () => {
  let service: LivroService;

  beforeEach(() => {
    service = new LivroService();
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
});
