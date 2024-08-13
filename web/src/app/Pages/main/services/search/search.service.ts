import { Injectable } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '../api/api.service'; // Assuming you have an API service
import { IScale, IPost, ISong, IMessage } from '../../interfaces/main'; // Import your interfaces

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private apiService: ApiService) {}

  search(query: string): Observable<any[]> {
    const scales$ = this.apiService.get<IScale[]>('scales').pipe(
      map(scales => scales.filter(scale => this.searchInScale(scale, query)))
    );

    const posts$ = this.apiService.get<IPost[]>('posts').pipe(
      map(posts => posts.filter(post => this.searchInPost(post, query)))
    );

    const songs$ = this.apiService.get<ISong[]>('songs').pipe(
      map(songs => songs.filter(song => this.searchInSong(song, query)))
    );

    return combineLatest([scales$, posts$, songs$]).pipe(
      map(([scales, posts, songs]) => [...scales, ...posts, ...songs])
    );
  }

  private searchInScale(scale: IScale, query: string): boolean {
    return this.searchInString(scale.title, query) ||
           this.searchInArray(scale.songs.map(song => song.title), query);
  }

  private searchInPost(post: IPost, query: string): boolean {
    return this.searchInString(post.title, query) ||
           this.searchInArray(post.content.map(content => content.title + content.content), query);
  }

  private searchInSong(song: ISong, query: string): boolean {
    return this.searchInString(song.title, query) ||
           this.searchInArray(song.version.map(version => version.interpreter.join(' ')), query);
  }

  private searchInString(text: string, query: string): boolean {
    return text.toLowerCase().includes(query.toLowerCase());
  }

  private searchInArray(array: string[], query: string): boolean {
    return array.some(item => this.searchInString(item, query));
  }
}
