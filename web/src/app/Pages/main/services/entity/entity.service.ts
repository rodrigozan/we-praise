import { Injectable, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ApiService } from '../../services/api/api.service';
import { LevelUserService } from '../../services/level-user/level-user.service';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  modalRef!: BsModalRef;
  modalTitle!: string;
  modalComponent!: any;
  currentUser: any; 

  constructor(
    private api: ApiService,
    private levelUserService: LevelUserService,
    private modalService: BsModalService,
    private cdr: ChangeDetectorRef
  ) {}

  getAll(endpoint: string) {
    return this.api.get(endpoint);
  }

  getOne(endpoint: string, id: string) {
    return this.api.get(`${endpoint}/${id}`);
  }

  openModal(
    action: string,
    entity: any,
    modalTemplate: TemplateRef<any>,
    components: { single: any; edit: any; delete: any }
  ) {
    switch (action) {
      case 'single':
        this.modalTitle = 'Visualizar';
        this.modalComponent = components.single;
        break;
      case 'edit':
        this.modalTitle = 'Editar';
        this.modalComponent = components.edit;
        break;
      case 'delete':
        this.modalTitle = 'Deletar';
        this.modalComponent = components.delete;
        break;
    }
    this.cdr.detectChanges();
    this.modalRef = this.modalService.show(modalTemplate);
    this.modalRef.content.title = this.modalTitle;
  }

  canEditOrDelete(endpoint: any): boolean {
    return this.levelUserService.isAdmin() || (this.levelUserService.isMinister() && this.currentUser?._id === endpoint.author._id);
  }
}
