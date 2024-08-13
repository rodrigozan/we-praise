import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from "../../Components/header/header.component";

import { ApiService } from '../main/services/api/api.service';
import { StorageService } from '../../Services/storage/storage.service';

import { IListDictionary } from '../../Interfaces/dictionary';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  dictionary: IListDictionary = new IListDictionary()

  user: any

  constructor(
    private api: ApiService,
    private storage: StorageService
  ){}

  ngOnInit(): void {
      this.get()
      console.log('User', this.user)
  }

  async get(){
    try {
      const id = this.storage.get('id')
      this.api.get(`users/${id}`).subscribe((user: any[]) => { this.user = user;console.log(this.user) })
    } catch (error) {
      throw new Error
    }
  }
}
