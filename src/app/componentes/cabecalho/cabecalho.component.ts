import { Component, input } from '@angular/core';

@Component({
  selector: 'app-cabecalho',
  imports: [],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css',
})
export class CabecalhoComponent {
  // @Input() src = '';
  // @Input() alt = '';

  src = input<string>();
  alt = input<string>();
}
