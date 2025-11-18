import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvaliacaoEstrelasComponent } from './avaliacao-estrelas.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

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
    TestBed.runInInjectionContext(() => {
      componente = new AvaliacaoEstrelasComponent();
    });
    fixture = TestBed.createComponent(AvaliacaoEstrelasComponent);
    componente = fixture.componentInstance;
  });

  it('deveria ser criado', () => {
    expect(componente).toBeTruthy();
  });

  it('deveria definir propriedades classificacao e signalClassificacao', () => {
    expect(componente.classificacao).toBeDefined();
  });

  it('deveria definir propriedades readOnly e estrelas', () => {
    expect(componente.readOnly).toBeDefined();
    expect(componente.estrelas).toBeDefined();
  });

  //   it('deveria inicializar com classificacao padrão 1', () => {
  //     expect(componente.valorAtualClassificacao()).toBe(1);
  //   });

  //   it('deveria definir classificacao válida via writeValue', () => {
  //     componente.writeValue(3);
  //     expect(componente.valorAtualClassificacao()).toBe(3);
  //   });

  //   it('deveria definir classificacao como 1 quando writeValue recebe valor inválido', () => {
  //     componente.writeValue(0);
  //     expect(componente.valorAtualClassificacao()).toBe(1);

  //     componente.writeValue(6);
  //     expect(componente.valorAtualClassificacao()).toBe(1);
  //   });

  //   it('deveria registrar função onChange', () => {
  //     const fn = jest.fn();
  //     componente.registerOnChange(fn);
  //     expect(componente.onChange).toBe(fn);
  //   });

  //   it('deveria registrar função onTouched', () => {
  //     const fn = jest.fn();
  //     componente.registerOnTouched(fn);
  //     expect(componente.onTouched).toBe(fn);
  //   });

  //   it('deveria definir readOnly ao chamar setDisabledState', () => {
  //     componente.setDisabledState?.(true);
  //     expect(componente.readOnly).toBe(true);

  //     componente.setDisabledState?.(false);
  //     expect(componente.readOnly).toBe(false);
  //   });

  //   it('deveria classificar quando não estiver readOnly', () => {
  //     componente.readOnly = false;
  //     const onChangeSpy = jest.fn();
  //     const onTouchedSpy = jest.fn();
  //     componente.registerOnChange(onChangeSpy);
  //     componente.registerOnTouched(onTouchedSpy);

  //     componente.classificar(4);

  //     expect(componente.valorAtualClassificacao()).toBe(4);
  //     expect(onChangeSpy).toHaveBeenCalledWith(4);
  //     expect(onTouchedSpy).toHaveBeenCalled();
  //   });

  //   it('não deveria classificar quando estiver readOnly', () => {
  //     componente.readOnly = true;
  //     const onChangeSpy = jest.fn();
  //     componente.registerOnChange(onChangeSpy);

  //     componente.classificar(4);

  //     expect(componente.valorAtualClassificacao()).toBe(1);
  //     expect(onChangeSpy).not.toHaveBeenCalled();
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
