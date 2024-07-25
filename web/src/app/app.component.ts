import { Component, OnInit  } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.get('users').subscribe(
      data => console.log(data),
      error => console.error('Erro ao buscar dados da API', error)
    )
  }
}
