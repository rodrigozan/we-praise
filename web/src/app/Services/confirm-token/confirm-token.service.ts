import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../Pages/auth/services/auth/auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class ConfirmTokenService {

  constructor(
    private authService: AuthService, 
    private router: Router, 
  ) { }

  isLogged(){
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/main'])
    }else {
      this.router.navigate(['/login'])
    }
  }
}
