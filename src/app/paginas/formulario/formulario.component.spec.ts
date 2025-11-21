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
});
