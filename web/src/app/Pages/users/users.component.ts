import { Component } from '@angular/core';

import { HeaderComponent } from "../../Components/header/header.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

}
