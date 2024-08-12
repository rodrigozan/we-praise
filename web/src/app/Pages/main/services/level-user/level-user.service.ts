import { Injectable } from '@angular/core';
import { IUser } from '../../../users/interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class LevelUserService {
  private currentUser: IUser | null = null;

  constructor() {
    this.loadUserFromStorage();
  }

  loadUserFromStorage() {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUser = JSON.parse(user);      
    }
  }

  setCurrentUser(user: IUser) {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user))
  }

  getCurrentUser(): IUser | null {
    return this.currentUser;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  isMinister(): boolean {
    return this.currentUser?.role === 'minister';
  }

  canEditSongOnScale(song: any): boolean {
    return this.isAdmin() || (this.isMinister() && this.currentUser?.id === song.author._id);
  }
}

