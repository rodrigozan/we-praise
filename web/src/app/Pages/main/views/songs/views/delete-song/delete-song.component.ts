import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { ISong } from '../../../../interfaces/main';
import { IListDictionary } from '../../../../../../Interfaces/dictionary';

@Component({
  selector: 'app-delete-song',
  standalone: true,
  imports: [],
  templateUrl: './delete-song.component.html',
  styleUrl: './delete-song.component.scss'
})
export class DeleteSongComponent {
  @Input() song: ISong | null = null;
  @Input() modalRef!: BsModalRef;
  dictionary: IListDictionary = new IListDictionary()

  confirmDelete(){}

  hide() {
    this.close()
    this.modalRef.hide(); 
  }

  close(): void {
    this.song = null;
  }
}
