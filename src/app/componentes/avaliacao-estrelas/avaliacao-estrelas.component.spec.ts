import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvaliacaoEstrelasComponent } from './avaliacao-estrelas.component';
import { Component, forwardRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

// @Component({
//   standalone: true,
//   template: `<app-avaliacao-estrelas
//     [classificacao]="valor"
//   ></app-avaliacao-estrelas>`,
//   imports: [AvaliacaoEstrelasComponent],
// })
// class HostComponent {
//   valor = 2;
// }

describe('AvaliacaoEstrelasComponent', () => {
  let componente: AvaliacaoEstrelasComponent;
  let fixture: ComponentFixture<AvaliacaoEstrelasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => AvaliacaoEstrelasComponent),
          multi: true,
        },
      ],
    });

    // TestBed.runInInjectionContext(() => {
    //   componente = new AvaliacaoEstrelasComponent();
    // });

    fixture = TestBed.createComponent(AvaliacaoEstrelasComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges(); // Adicione para inicializar o DOM
  });

  // testes básicos de inicialização

  it('deveria ser criado', () => {
    expect(componente).toBeTruthy();
  });

  it('deveria definir propriedades classificacao e signalClassificacao', () => {
    expect(componente.classificacao).toBeDefined();
  });

  it('deveria criar componente usando runInInjectionContext', () => {
    TestBed.runInInjectionContext(() => {
      const novoComponente = new AvaliacaoEstrelasComponent();
      expect(novoComponente).toBeTruthy();
      expect(novoComponente.valorAtualClassificacao()).toBe(1);
      expect(novoComponente.estrelas).toEqual([1, 2, 3, 4, 5]);
      expect(novoComponente.readOnly).toBe(true);
    });
  });

  it('deveria ter array estrelas com valores de 1 a 5', () => {
    expect(componente.estrelas).toEqual([1, 2, 3, 4, 5]);
  });

  it('deveria definir propriedades readOnly e estrelas', () => {
    expect(componente.readOnly).toBeDefined();
    expect(componente.estrelas).toBeDefined();
  });

  it('deveria inicializar com classificacao padrão 1', () => {
    expect(componente.valorAtualClassificacao()).toBe(1);
  });

  // testes sobre onChange e onTouched

  it('deveria registrar função onChange', () => {
    const fn = jest.fn();
    componente.registerOnChange(fn);
    expect(componente.onChange).toBe(fn);
  });

  it('deveria registrar função onChange com spyOn', () => {
    componente.readOnly = false;
    const onChangeSpy = jest.spyOn(componente, 'onChange');
    componente.classificar(4);
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('deveria registrar função onTouched', () => {
    const fn = jest.fn();
    componente.registerOnTouched(fn);
    expect(componente.onTouched).toBe(fn);
  });

  it('deveria registrar função onTouched com spyOn', () => {
    componente.readOnly = false;
    const onTouchedSpy = jest.spyOn(componente, 'onTouched');
    componente.classificar(4);
    expect(onTouchedSpy).toHaveBeenCalled();
  });

  // testes para classificar quando readOnly = true ou false

  it('não deveria classificar quando readOnly = true', () => {
    componente.readOnly = true;
    const onChangeSpy = jest.fn();
    componente.registerOnChange(onChangeSpy);

    componente.classificar(4);

    expect(componente.valorAtualClassificacao()).toBe(1);
    expect(onChangeSpy).not.toHaveBeenCalled();
  });

  it('não deveria classificar quando readOnly = true -- onChange', () => {
    componente.readOnly = true;
    const onChangeSpy = jest.spyOn(componente, 'onChange');
    componente.classificar(4);
    expect(onChangeSpy).not.toHaveBeenCalled();
    expect(componente.valorAtualClassificacao()).not.toBe(4);
  });

  it('deveria classificar quando readOnly = false', () => {
    componente.readOnly = false;
    const onChangeSpy = jest.fn();
    const onTouchedSpy = jest.fn();
    componente.registerOnChange(onChangeSpy);
    componente.registerOnTouched(onTouchedSpy);

    componente.classificar(4);

    expect(componente.valorAtualClassificacao()).toBe(4);
    expect(onChangeSpy).toHaveBeenCalledWith(4);
    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('deveria classificar quando readOnly = false -- onChange', () => {
    componente.readOnly = false;
    const onChangeSpy = jest.spyOn(componente, 'onChange');
    componente.classificar(4);
    expect(onChangeSpy).toHaveBeenCalled();
    expect(componente.valorAtualClassificacao()).toBe(4);
  });

  // testes quando writeValue recebe valor válido ou inválido

  it('deveria definir classificacao válida via writeValue', () => {
    componente.writeValue(3);
    expect(componente.valorAtualClassificacao()).toBe(3);
  });

  it('deveria definir classificacao como 1 quando writeValue recebe valor inválido', () => {
    componente.writeValue(0);
    expect(componente.valorAtualClassificacao()).toBe(1);

    componente.writeValue(6);
    expect(componente.valorAtualClassificacao()).toBe(1);
  });

  it('deveria definir classificacao como 1 quando writeValue recebe valor inválido -- com Array', () => {
    const valoresInvalidos = [-6, 0, 'abc', undefined];

    valoresInvalidos.forEach((valorInvalido) => {
      componente.writeValue(valorInvalido as number);
    });

    expect(componente.valorAtualClassificacao()).toBe(1);
  });

  // testes sobre atualizar o DOM

  it('deveria ter exatamente 5 botões de estrela', () => {
    const botoes = fixture.nativeElement.querySelectorAll('button');
    expect(botoes.length).toBe(5);
  });

  it('deveria atualizar o DOM quando a classificação muda', () => {
    componente.readOnly = false;
    const classificacao = 3;
    componente.classificar(classificacao);
    fixture.detectChanges();
    // se um teste não passar, adicione fixture.detectChanges()
    // para verificar se é devido à falta de atualização do DOM!

    const estrelaPreenchida = fixture.nativeElement.querySelector('.filled');
    expect(estrelaPreenchida).toBeTruthy();
  });

  it('deveria atualizar o DOM quando a classificação muda - estrelasPreenchidas', () => {
    componente.readOnly = false;
    const classificacao = 3;
    componente.classificar(classificacao);
    fixture.detectChanges();

    const estrelasPreenchidas =
      fixture.nativeElement.querySelectorAll('.filled');
    expect(estrelasPreenchidas.length).toBe(3);
  });

  it('não deveria atualizar o DOM quando a classificação é inválida', () => {
    componente.readOnly = false;

    // Define uma classificação válida primeiro
    componente.writeValue(3);
    fixture.detectChanges();

    // Tenta classificar com valor inválido
    // classificar() verifica readOnly e valida o input
    componente.classificar(0);
    fixture.detectChanges();

    const estrelasPreenchidas =
      fixture.nativeElement.querySelectorAll('.filled');
    expect(estrelasPreenchidas.length).not.toBe(0);
    expect(componente.valorAtualClassificacao()).not.toBe(0);
  });

  it('deveria permitir classificações sequenciais alterando o DOM', () => {
    // ao clicar na terceira estrelinha e depois na quinta, a alteração ocorre conforme esperado

    componente.readOnly = false;

    componente.classificar(2);
    fixture.detectChanges();
    let estrelasPreenchidas = fixture.nativeElement.querySelectorAll('.filled');
    expect(estrelasPreenchidas.length).toBe(2);

    componente.classificar(5);
    fixture.detectChanges();
    estrelasPreenchidas = fixture.nativeElement.querySelectorAll('.filled');
    expect(estrelasPreenchidas.length).toBe(5);

    componente.classificar(1);
    fixture.detectChanges();
    estrelasPreenchidas = fixture.nativeElement.querySelectorAll('.filled');
    expect(estrelasPreenchidas.length).toBe(1);
  });

  it('não deveria reagir a cliques quando readOnly = true', () => {
    componente.readOnly = true;
    componente.writeValue(2);
    fixture.detectChanges();

    const botoes = fixture.nativeElement.querySelectorAll('button');
    botoes[4].click(); // quinta estrela
    fixture.detectChanges();

    expect(componente.valorAtualClassificacao()).toBe(2);
    const estrelasPreenchidas =
      fixture.nativeElement.querySelectorAll('.filled');
    expect(estrelasPreenchidas.length).toBe(2);
  });

  it('deveria aplicar classe filled corretamente para cada classificação', () => {
    componente.readOnly = false;

    [1, 2, 3, 4, 5].forEach((rating) => {
      componente.classificar(rating);
      fixture.detectChanges();

      const botoes = fixture.nativeElement.querySelectorAll('button');
      botoes.forEach((botao: HTMLElement, index: number) => {
        if (index < rating) {
          expect(botao.classList.contains('filled')).toBe(true);
        } else {
          expect(botao.classList.contains('filled')).toBe(false);
        }
      });
    });
  });

  // ---------------------------------------------------------------------

  //   it('deveria definir readOnly ao chamar setDisabledState', () => {
  //     componente.setDisabledState?.(true);
  //     expect(componente.readOnly).toBe(true);

  //     componente.setDisabledState?.(false);
  //     expect(componente.readOnly).toBe(false);
  //   });

  //   it('deveria ter array estrelas com valores de 1 a 5', () => {
  //     expect(componente.estrelas).toEqual([1, 2, 3, 4, 5]);
  //   });

  //   it('deveria aceitar limites inferiores e superiores válidos via writeValue', () => {
  //     componente.writeValue(1);
  //     expect(componente.valorAtualClassificacao()).toBe(1);
  //     componente.writeValue(5);
  //     expect(componente.valorAtualClassificacao()).toBe(5);
  //   });

  //   it('deveria resetar para 1 em sequência com valores inválidos intercalados', () => {
  //     componente.writeValue(2);
  //     expect(componente.valorAtualClassificacao()).toBe(2);
  //     componente.writeValue(0); // inválido
  //     expect(componente.valorAtualClassificacao()).toBe(1);
  //     componente.writeValue(5);
  //     expect(componente.valorAtualClassificacao()).toBe(5);
  //     componente.writeValue(7); // inválido
  //     expect(componente.valorAtualClassificacao()).toBe(1);
  //   });

  //   it('deveria chamar onChange múltiplas vezes em classificações sequenciais', () => {
  //     componente.readOnly = false;
  //     const onChangeSpy = jest.fn();
  //     componente.registerOnChange(onChangeSpy);
  //     componente.classificar(2);
  //     componente.classificar(5);
  //     componente.classificar(3);
  //     expect(onChangeSpy).toHaveBeenNthCalledWith(1, 2);
  //     expect(onChangeSpy).toHaveBeenNthCalledWith(2, 5);
  //     expect(onChangeSpy).toHaveBeenNthCalledWith(3, 3);
  //     expect(componente.valorAtualClassificacao()).toBe(3);
  //   });

  //   it('deveria impedir alteração após desabilitar via setDisabledState', () => {
  //     componente.readOnly = false;
  //     componente.classificar(4);
  //     expect(componente.valorAtualClassificacao()).toBe(4);
  //     componente.setDisabledState?.(true);
  //     componente.classificar(2);
  //     expect(componente.valorAtualClassificacao()).toBe(4);
  //   });

  //   describe('sincronização com input do componente pai', () => {
  //     let hostFixture: ComponentFixture<HostComponent>;
  //     beforeEach(() => {
  //       hostFixture = TestBed.createComponent(HostComponent);
  //       hostFixture.detectChanges();
  //     });

  //     it('deveria receber valor inicial do pai', () => {
  //       const child = hostFixture.debugElement.query(
  //         By.directive(AvaliacaoEstrelasComponent)
  //       ).componentInstance as AvaliacaoEstrelasComponent;
  //       expect(child.valorAtualClassificacao()).toBe(2);
  //     });

  //     it('deveria atualizar quando pai muda para valor válido', () => {
  //       const childDebug = hostFixture.debugElement.query(
  //         By.directive(AvaliacaoEstrelasComponent)
  //       );
  //       const child = childDebug.componentInstance as AvaliacaoEstrelasComponent;
  //       hostFixture.componentInstance.valor = 5;
  //       hostFixture.detectChanges();
  //       expect(child.valorAtualClassificacao()).toBe(5);
  //     });

  //     it('deveria redefinir para 1 quando pai fornece valor inválido', () => {
  //       const childDebug = hostFixture.debugElement.query(
  //         By.directive(AvaliacaoEstrelasComponent)
  //       );
  //       const child = childDebug.componentInstance as AvaliacaoEstrelasComponent;
  //       hostFixture.componentInstance.valor = 0;
  //       hostFixture.detectChanges();
  //       expect(child.valorAtualClassificacao()).toBe(1);
  //       hostFixture.componentInstance.valor = 6;
  //       hostFixture.detectChanges();
  //       expect(child.valorAtualClassificacao()).toBe(1);
  //     });
  //   });
});
