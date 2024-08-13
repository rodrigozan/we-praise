import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { IScale } from '../../../../interfaces/main';
import { IListDictionary } from '../../../../../../Interfaces/dictionary';

@Component({
  selector: 'app-edit-scale',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-scale.component.html',
  styleUrls: ['./edit-scale.component.scss']
})
export class EditScaleComponent implements OnInit {
  @Input() scale: IScale | null = null;
  @Input() modalRef!: BsModalRef;
  dictionary: IListDictionary = new IListDictionary()

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
      console.log(this.scale)
  }

  hide() {
    this.close()
    this.modalRef.hide(); 
  }

  close(): void {
    this.scale = null;
  }
}