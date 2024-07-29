import { Routes, CanActivate } from '@angular/router';

import { MainComponent } from './Pages/main/main.component';
import { AuthComponent } from './Pages/auth/auth.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';

import { AuthService } from './Pages/auth/services/auth.service';

export const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    {
        path: 'main',
        component: MainComponent,
        children: [
            {
                path: 'scales',
                loadComponent: () =>
                    import('./Pages/main/views/scales/scales.component').then(
                        (m) => m.ScalesComponent
                    )
            },
            {
                path: 'publications',
                loadComponent: () =>
                    import('./Pages/main/views/posts/posts.component').then(
                        (m) => m.PostsComponent
                    )
            },
            {
                path: 'musics',
                loadComponent: () =>
                    import('./Pages/main/views/songs/songs.component').then(
                        (m) => m.SongsComponent
                    )
            },
            {
                path: 'messages',
                loadComponent: () =>
                    import('./Pages/main/views/messages/messages.component').then(
                        (m) => m.MessagesComponent
                    )
            }
        ]
    },
    { path: 'login', component: AuthComponent },
    { path: '**', component: NotFoundComponent }
];
