import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { ISong } from '../../../../interfaces/main';
import { IListDictionary } from '../../../../../../Interfaces/dictionary';

@Component({
  selector: 'app-edit-song',
  standalone: true,
  imports: [],
  templateUrl: './edit-song.component.html',
  styleUrl: './edit-song.component.scss'
})
export class EditSongComponent {
  @Input() song: ISong | null = null;
  @Input() modalRef!: BsModalRef;
  dictionary: IListDictionary = new IListDictionary()

  hide() {
    this.close()
    this.modalRef.hide(); 
  }

  close(): void {
    this.song = null;
  }
}
