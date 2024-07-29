import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet, Router } from '@angular/router'

import { BootstrapIconComponent } from '../../Components/bootstrap-icon/bootstrap-icon.component'

import { ConfirmTokenService } from '../../Services/confirm-token/confirm-token.service'
import { AuthService } from '../auth/services/auth.service'

import { IListDictionary } from '../../Interfaces/dictionary'

import { fadeAnimation } from '../../Animations/animations'

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BootstrapIconComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  animations: [fadeAnimation]
})
export class MainComponent implements OnInit {

  dictionary: IListDictionary = new IListDictionary()
  itsMan: Boolean = true

  content = [
    { title: this.dictionary.titleScales.pt, route: this.dictionary.titleScales.en },
    { title: this.dictionary.titlePosts.pt, route: this.dictionary.titlePosts.en   },
    { title: this.dictionary.titleMessages.pt, route: this.dictionary.titleMessages.en   },
    { title: this.dictionary.titleSongs.pt, route: this.dictionary.titleSongs.en   }
  ]

  constructor(private router: Router, private confirmToken: ConfirmTokenService, private auth: AuthService){}

  ngOnInit(): void {
    this.confirmToken.isLogged()
  }

  goTo(route: string){
    this.router.navigate([`${this.dictionary.routeMain}/${this.lowerCase(route)}`])
    this.itsMan = !this.itsMan
    
  }

  lowerCase(word: string){
    return this.normalizeString(word.toLowerCase())
  }

  normalizeString(word: string){
    return word.normalize("NFD").replace(/[^a-zA-Z\s]/g, "")
  }

  logout(){
    this.auth.logout()
  }
  
}
