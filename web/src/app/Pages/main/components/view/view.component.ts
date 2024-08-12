import { Component, Input } from '@angular/core';

import { ISong } from '../../interfaces/main';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [],
  templateUrl: './single-song.component.html',
  styleUrl: './single-song.component.scss'
})
export class ViewComponent {
  @Input() song: ISong | null = null;

  hide() {
    // Lógica para esconder o modal
  }

  close(): void {
    this.song = null;
  }
}
