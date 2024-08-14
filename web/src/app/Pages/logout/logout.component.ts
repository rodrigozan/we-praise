import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/services/auth/auth.service'

import { IListDictionary } from '../../Interfaces/dictionary';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit {

  dictionary: IListDictionary = new IListDictionary()

  constructor(
    private authService: AuthService, 
    private router: Router, 
  ){}

  ngOnInit(): void {
      setTimeout(() => {
        this.logout()
      }, 2000);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
