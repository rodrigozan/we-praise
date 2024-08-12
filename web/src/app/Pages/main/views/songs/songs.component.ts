import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { IListDictionary } from '../../../../Interfaces/dictionary';
import { ISong } from '../../interfaces/main';

import { ApiService } from '../../services/api/api.service';
import { LevelUserService } from '../../services/level-user/level-user.service';

import { SingleSongComponent } from './views/single-song/single-song.component';
import { EditSongComponent } from './views/edit-song/edit-song.component';
import { DeleteSongComponent } from './views/delete-song/delete-song.component';
@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [CommonModule, SingleSongComponent, EditSongComponent, DeleteSongComponent],
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.scss',
  providers: [BsModalService]
})

export class SongsComponent { 
  dictionary: IListDictionary = new IListDictionary()
  songs: ISong[] = []
  song: ISong | null = null;
  currentView: string = '';
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;
  modalRef!: BsModalRef;
  modalTitle!: string;
  modalComponent!: any;
  currentUser: any; 

  constructor(
    private api: ApiService, 
    private modalService: BsModalService, 
    private levelUserService: LevelUserService
  ) { }

  ngOnInit(): void {    
    this.get()
  }

  async get() {
    try {
      this.api.get(`songs`).subscribe((songs: ISong[]) => { console.log(songs);this.songs = songs })
    } catch (error) {
      throw new Error
    }
  }

  async getOne(id: string) {
    try {
      this.api.get(`songs/${id}`).subscribe((songs: any[]) => { this.songs = songs })
    } catch (error) {
      throw new Error
    }
  }

  openModal(action: string, song: any) {
    switch (action) {
      case 'single':
        this.modalTitle = 'Visualizar Música';
        this.modalComponent = SingleSongComponent;
        break;
      case 'edit':
        this.modalTitle = 'Editar Música';
        this.modalComponent = EditSongComponent;
        break;
      case 'delete':
        this.modalTitle = 'Deletar Música';
        this.modalComponent = DeleteSongComponent;
        break;
    }
    this.currentView = action
    this.song = song; 
    this.modalRef = this.modalService.show(this.modalTemplate);
    this.modalRef.content.title = this.modalTitle
  }

  canEditOrDelete(song: any): boolean {
    return this.levelUserService.isAdmin() || (this.levelUserService.isMinister() && this.currentUser?._id === song.author._id);
  }

}


