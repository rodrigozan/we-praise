import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, RouterOutlet, Router } from '@angular/router'

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from "../../Components/header/header.component";
import { BootstrapIconComponent } from '../../Components/bootstrap-icon/bootstrap-icon.component'
import { SearchComponent } from './components/search/search.component'

import { ConfirmTokenService } from '../../Services/confirm-token/confirm-token.service'
import { AuthService } from '../auth/services/auth.service'
import { LevelUserService } from './services/level-user/level-user.service'

import { IListDictionary } from '../../Interfaces/dictionary'

import { fadeAnimation } from '../../Animations/animations'
import { MENU_CONTENT } from '../../Shared/header.constant';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, BootstrapIconComponent, NgbDropdownModule, SearchComponent, HeaderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  animations: [fadeAnimation]
})

export class MainComponent implements OnInit {

  dictionary: IListDictionary = new IListDictionary()
  
  itsMan: Boolean = true

  content = MENU_CONTENT

  constructor(
    private router: Router,
    private confirmToken: ConfirmTokenService,
    private auth: AuthService,
    private levelUserService: LevelUserService
  ) { }

  ngOnInit(): void {
    this.confirmToken.isLogged()
    this.levelUserService.loadUserFromStorage()
  }

  goTo(route: string) {
    if (route === 'user/profile') {
      this.router.navigate([route])
    } else {
      this.router.navigate([`${this.dictionary.routeMain}/${this.lowerCase(route)}`])
      this.itsMan = !this.itsMan
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
