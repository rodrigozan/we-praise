import { Component, Input, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ButtonsComponent } from '../buttons/buttons.component';

@Component({
  selector: 'app-actions',
  standalone: true,
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  imports: [ButtonsComponent],
  providers: [BsModalService]
})
export class ActionsComponent implements OnInit {
  @Input() typeContent: any;
  @Input() NeutralComponent: any;

  currentView: string = ''; 

  constructor(private modalService: BsModalService) {}

  ngOnInit() {}

  openModal(action: string) {
    this.currentView = action;
    let modalComponent: any;

    switch (action) {
      case 'single':
        modalComponent = this.NeutralComponent;
        break;
      case 'edit':
        modalComponent = this.NeutralComponent;
        break;
      case 'delete':
        modalComponent = this.NeutralComponent;
        break;
    }

    if (modalComponent) {
      const modalRef = this.modalService.show(modalComponent);
      modalRef.contentInstance.scale = this.typeContent; // Pass data to modal component
    }
  }
}
