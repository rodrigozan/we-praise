import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-buttons',
  standalone: true,
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {
  @Input() variant: string = '';
  @Input() text: string = '';

  getButtonClass() {
    return `btn btn-${this.variant}`;
  }
}
