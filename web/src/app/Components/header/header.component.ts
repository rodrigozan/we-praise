import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, Router } from '@angular/router'

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { BootstrapIconComponent } from '../../Components/bootstrap-icon/bootstrap-icon.component'

import { IListDictionary } from '../../Interfaces/dictionary'

import { MENU_CONTENT, MENU_PROFILE } from '../../Shared/header.constant'
import { AuthService } from '../../Pages/auth/services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule, BootstrapIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  dictionary: IListDictionary = new IListDictionary()

  menu_content = MENU_CONTENT
  menu_profile = MENU_PROFILE

  constructor(private router: Router, private auth: AuthService,) { }

  goTo(route: string) {
    route = route.toLowerCase()
    if (route === 'user/profile' || route === 'logout') {
      alert(route)
      this.router.navigate([route])
    } else {
      this.router.navigate([`${this.dictionary.routeMain}/${this.lowerCase(route)}`])
    }
  }

  lowerCase(word: string) {
    return this.normalizeString(word.toLowerCase())
  }

  normalizeString(word: string) {
    return word.normalize("NFD").replace(/[^a-zA-Z\s]/g, "")
  }

  logout() {
    this.auth.logout()
  }
}
