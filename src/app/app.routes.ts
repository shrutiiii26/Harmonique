import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LikedSongsComponent } from './home/liked-songs/liked-songs.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        loadComponent: () =>
            import('./login/login.component').then((c) => c.LoginComponent),
    },
    {
        path: 'sidebar',
        loadComponent: () =>
            import('./sidebar/sidebar.component').then((c) => c.SidebarComponent),
    },
    {
        path: 'home',
        loadComponent: () =>
            import('./home/home.component').then((c) => c.HomeComponent),
    },
    {
        path: 'liked-songs',
        loadComponent: () =>
            import('./home/liked-songs/liked-songs.component').then((c) => c.LikedSongsComponent),
    },
    {
        path: 'playing-now',
        loadComponent: () =>
            import('./home/playing-now/playing-now.component').then((c) => c.PlayingNowComponent),
    },


];
