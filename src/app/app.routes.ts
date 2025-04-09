import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LikedSongsComponent } from './liked-songs/liked-songs.component';

export const routes: Routes = [
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'like-songs', component: LikedSongsComponent
    },


];
