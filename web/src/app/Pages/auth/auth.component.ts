import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { ILogin } from './interfaces/login.interface';

import { AuthService } from './services/auth/auth.service'; 
import { ConfirmTokenService } from '../../Services/confirm-token/confirm-token.service';
import { LevelUserService } from '../main/services/level-user/level-user.service';
import { IListDictionary } from '../../Interfaces/dictionary';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class AuthComponent implements OnInit{

  dictionary: IListDictionary = new IListDictionary()

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private location: Location,
    private confirmToken: ConfirmTokenService,
    private levelUserService: LevelUserService
  ) {}

  ngOnInit(): void {
    this.confirmToken.isLogged()
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const credentials: ILogin = {
        email: email ?? '',
        password: password ?? ''
      }
      this.authService.login(credentials)
        .subscribe(
          (res) => {
            this.levelUserService.setCurrentUser(res)
            console.log('res', res);
            
            this.router.navigate(['/']);
          },
          error => {            
            console.error('Error logging in:', error);
            this.refreshPage()
          }
        );
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  refreshPage(): void {
    this.location.go(this.location.path());
    window.location.reload();
  }
}
