import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaskitoDirective} from '@maskito/angular'
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from "../../Components/header/header.component";
import { ChangePasswordComponent } from './components/change-password/change-password.component'
import { BootstrapIconComponent } from '../../Components/bootstrap-icon/bootstrap-icon.component';

import { ApiService } from '../main/services/api/api.service';
import { StorageService } from '../../Services/storage/storage.service';

import { IListDictionary } from '../../Interfaces/dictionary';
import { IUser } from './interfaces/users.interface';

import { MaskDirective } from '../../Directives/Mask.directive';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MaskitoDirective, FormsModule, HeaderComponent, ChangePasswordComponent, BootstrapIconComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  dictionary: IListDictionary = new IListDictionary()

  user: any
  showPassword = false;
  showPasswordIcon = 'eye-slash';
  blur = 'blur'
  itsTrue = true

  constructor(
    public mask: MaskDirective,
    private api: ApiService,
    private storage: StorageService,
  ){}

  ngOnInit(): void {
      this.get()
  }

  async get(){
    try {
      const id = this.storage.get('id')
      this.api.get<IUser>(`users/${id}`).subscribe((user: any[]) => { 
        this.user = user;
      })
    } catch (error) {
      throw new Error
    }
  }

  async showPass(){
    this.showPassword = !this.showPassword;
    this.showPasswordIcon = this.showPassword ? 'eye' : 'eye-slash'
    this.blur = this.showPassword ? 'not-blur' : 'blur'
  }

  onCancelChangePassword() {
    this.itsTrue = true; 
  }
}
