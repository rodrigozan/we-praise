import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { ApiService } from '../../services/api/api.service';

import { IListDictionary } from '../../../../Interfaces/dictionary';

@Component({
  selector: 'app-scales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scales.component.html',
  styleUrl: './scales.component.scss'
})
export class ScalesComponent implements OnInit {
  scales: any
  dictionary: IListDictionary = new IListDictionary()

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.get()
  }

  async get() {
    try {
      this.api.get(`scales`).subscribe((scales: any[]) => { this.scales = scales })
    } catch (error) {
      throw new Error
    }
  }

  async getOne(id: string) {
    try {
      this.api.get(`scales/${id}`).subscribe((scales: any[]) => { this.scales = scales })
    } catch (error) {
      throw new Error
    }
  }


}
