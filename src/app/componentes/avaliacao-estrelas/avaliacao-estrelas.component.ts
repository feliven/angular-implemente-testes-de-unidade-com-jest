import { Component, effect, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-avaliacao-estrelas',
  imports: [],
  templateUrl: './avaliacao-estrelas.component.html',
  styleUrl: './avaliacao-estrelas.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AvaliacaoEstrelasComponent),
      multi: true,
    },
  ],
})
export class AvaliacaoEstrelasComponent implements ControlValueAccessor {
  // @Input() classificacao: number = 1;

  // Input signal (somente leitura externa)
  classificacao = input<number>(1);

  // Sinal interno mutável usado pela interação
  private signalClassificacao = signal<number>(1);

  readOnly: boolean = true;
  estrelas: number[] = [1, 2, 3, 4, 5];
  onChange = (signalClassificacao: number) => {};
  onTouched = () => {};

  // Sincroniza quando pai muda a classificação
  constructor() {
    effect(() => {
      const classificacaoVindaDoElementoPai = this.classificacao();
      this.signalClassificacao.set(
        this.isClassificationValid(classificacaoVindaDoElementoPai)
          ? classificacaoVindaDoElementoPai
          : 1
      );
    });
  }

  writeValue(classificacao: number): void {
    this.signalClassificacao.set(
      this.isClassificationValid(classificacao) ? classificacao : 1
    );
  }

  private isClassificationValid(classificacao: number): boolean {
    return classificacao >= 1 && classificacao <= 5;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.readOnly = isDisabled;
  }

  classificar(classificacao: number) {
    if (this.readOnly) return;

    this.signalClassificacao.set(classificacao);
    this.onChange(this.signalClassificacao());
    this.onTouched();
  }

  valorAtualClassificacao() {
    return this.signalClassificacao();
  }
}
