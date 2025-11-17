import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-rodape',
    imports: [],
    templateUrl: './rodape.component.html',
    styleUrl: './rodape.component.css'
})
export class RodapeComponent {
  @Input() src = '';
  @Input() alt = '';
}
