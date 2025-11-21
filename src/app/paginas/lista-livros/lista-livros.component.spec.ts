import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ListaLivrosComponent } from './lista-livros.component';
import { GeneroLiterario } from '../../componentes/livro/livro';
import { LivroService } from '../../services/livro.service';

describe('ListaLivrosComponent', () => {
  let component: ListaLivrosComponent;
  let fixture: ComponentFixture<ListaLivrosComponent>;
  let livroService: jest.Mocked<LivroService>;

  const mockGeneros: GeneroLiterario[] = [
    { id: '1', value: 'Ficção' },
    { id: '2', value: 'Não-ficção' },
  ];

  beforeEach(() => {
    const livroServiceMock = {
      generos: mockGeneros,
    };

    TestBed.configureTestingModule({
      imports: [ListaLivrosComponent],
      providers: [
        { provide: LivroService, useValue: livroServiceMock },
        provideRouter([]),
      ],
    });

    fixture = TestBed.createComponent(ListaLivrosComponent);
    component = fixture.componentInstance;
    livroService = TestBed.inject(LivroService) as jest.Mocked<LivroService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize livros as empty array', () => {
    expect(component.livros).toEqual([]);
  });

  it('should initialize generos as empty array', () => {
    expect(component.generos).toEqual([]);
  });

  it('should load generos from service on ngOnInit', () => {
    component.ngOnInit();
    expect(component.generos).toEqual(mockGeneros);
  });

  it('should have livroService injected', () => {
    expect(component.livroService).toBeDefined();
  });
});
