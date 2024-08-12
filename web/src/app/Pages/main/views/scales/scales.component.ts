import { Component, OnInit, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ApiService } from '../../services/api/api.service';
import { LevelUserService } from '../../services/level-user/level-user.service';

import { IScale } from '../../interfaces/main';

import { IListDictionary } from '../../../../Interfaces/dictionary';

import { SingleScaleComponent } from './views/single-scale/single-scale.component';
import { EditScaleComponent } from './views/edit-scale/edit-scale.component';
import { DeleteScaleComponent } from './views/delete-scale/delete-scale.component';

@Component({
  selector: 'app-scales',
  standalone: true,
  imports: [CommonModule, SingleScaleComponent, EditScaleComponent, DeleteScaleComponent],
  templateUrl:  './scales.component.html',
  styleUrl: './scales.component.scss',
  providers: [BsModalService]
})
export class ScalesComponent implements OnInit {
  scales: IScale[] = []
  scale: IScale | null = null; 
  currentView: string = '';
  modalTitle!: string;
  modalRef!: BsModalRef;
  modalComponent!: any;
  currentUser: any; 

  dictionary: IListDictionary = new IListDictionary()

  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;
  

  constructor(
    private api: ApiService,
    private levelUserService: LevelUserService,
    private modalService: BsModalService, 
  ) {}

  ngOnInit(): void {
    this.get()
  }

  async get() {
    try {
      this.api.get(`scales`).subscribe((scales: any[]) => { this.scales = scales })
    } catch (error) {
      throw new Error
    }
  }

  async getOne(id: string) {
    try {
      this.api.get(`scales/${id}`).subscribe((scales: any[]) => { this.scales = scales })
    } catch (error) {
      throw new Error
    }
  }

  openModal(action: string, scale: any) {
    switch (action) {
      case 'single':
        this.modalTitle = 'Visualizar Escala';
        this.modalComponent = SingleScaleComponent;
        break;
      case 'edit':
        this.modalTitle = 'Editar Escala';
        this.modalComponent = EditScaleComponent;
        break;
      case 'delete':
        this.modalTitle = 'Deletar Escala';
        this.modalComponent = DeleteScaleComponent;
        break;
    }
    this.currentView = action
    this.scale = scale; 
    this.modalRef = this.modalService.show(this.modalTemplate);
    this.modalRef.content.title = this.modalTitle
  }

  canEditOrDelete(scale: any): boolean {
    return this.levelUserService.isAdmin() || (this.levelUserService.isMinister() && this.currentUser?._id === scale.author._id);
  }


}
