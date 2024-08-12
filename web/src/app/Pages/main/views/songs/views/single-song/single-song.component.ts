import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { ISong } from '../../../../interfaces/main';
import { IListDictionary } from '../../../../../../Interfaces/dictionary';

@Component({
  selector: 'app-single-song',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-song.component.html',
  styleUrls: ['./single-song.component.scss']
})
export class SingleSongComponent implements OnInit {
  @Input() song: ISong | null = null;
  @Input() modalRef!: BsModalRef;
  dictionary: IListDictionary = new IListDictionary()

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
      console.log(this.song)
  }

  getYouTubeVideoUrl(link: string): SafeResourceUrl {
    const videoId = this.getYouTubeVideoId(link);
    const url = `https://www.youtube.com/embed/${videoId}`;
    console.log(this.sanitizer.bypassSecurityTrustResourceUrl(url));
    
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getYouTubeVideoId(link: string): string {
    const regExp = /^.*(youtu.be\/|youtube.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=)|music.youtube.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^#\&\?]*).*/;
    const match = link.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  }

  hide() {
    this.close()
    this.modalRef.hide(); 
  }

  close(): void {
    this.song = null;
  }
}
