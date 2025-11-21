import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { FormularioComponent } from '../formulario/formulario.component';
import { LivroService } from '../../services/livro.service';

describe('FormularioComponent', () => {
  let componente: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;
  let service: LivroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormularioComponent, ReactiveFormsModule, RouterTestingModule],
      providers: [LivroService, FormBuilder],
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
