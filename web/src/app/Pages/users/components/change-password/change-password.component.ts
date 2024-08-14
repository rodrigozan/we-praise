import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import * as bcrypt from 'bcryptjs';

import { IListDictionary } from '../../../../Interfaces/dictionary';
import { StorageService } from '../../../../Services/storage/storage.service';
import { ChangePasswordService } from '../../services/change-password/change-password.service';
import { IChangePasswordRequest } from '../../interfaces/change-password.interface';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  dictionary: IListDictionary = new IListDictionary();

  @Input() hashedPassword: string = ''
  @Input() itsDisabled: boolean = true;
  @Output() cancel = new EventEmitter<void>();

  changePassForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  currentPasswordSuccess: boolean = false; 
  user: any;

  constructor(
    private storage: StorageService,
    private changePasswordService: ChangePasswordService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void { }

  get passwordsMatch(): boolean {
    const { newPassword, confirmPassword } = this.changePassForm.value;
    return newPassword === confirmPassword;
  }

  async confirmCurrentPassword() {
    const currentPassword = this.changePassForm.get('currentPassword')?.value || '';    
    const match = await bcrypt.compare(currentPassword, this.hashedPassword);
    
    this.currentPasswordSuccess = match;
    
    this.cdr.detectChanges();
  }

  async changePassword() {
    if (!this.passwordsMatch) {
      return;
    }
    
    const id = this.storage.get('id') || "";

    try {      
      const changePasswordRequest: IChangePasswordRequest = {
        password: this.changePassForm.get('currentPassword')?.value || '',
        newPassword: this.changePassForm.get('newPassword')?.value || ''
      };

      await this.changePasswordService.changePassword(id, changePasswordRequest).subscribe(
        (user) => {
          this.user = user; 
        },
        (error) => {
          console.error(error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  async requestPasswordReset() {
    try {
      await this.changePasswordService.requestPasswordReset(this.user.email).subscribe(
        () => {},
        (error) => {
          console.error(error);
        }
      );
    } catch (error: any) {
      throw new Error(error);
    }
  }

  onCancel() {
    this.itsDisabled = true;
    this.cancel.emit(); 
  }
}
