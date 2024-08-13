import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchService } from '../../services/search/search.service';

import { IListDictionary } from '../../../../Interfaces/dictionary';

@Component({
  selector: 'app-search-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchResults: any[] = []
  searchTerm = ''

  dictionary: IListDictionary = new IListDictionary()

  constructor(private searchService: SearchService) { }

  search() {
    if (this.searchTerm.length > 0) { 
      this.searchService.search(this.searchTerm).subscribe(results => {
        this.searchResults = results;
      });
    } else {
      this.searchResults = []; 
    }
  }

}
