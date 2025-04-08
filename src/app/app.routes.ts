import { Routes } from '@angular/router';
import { HomeRoutingModule } from './home/home-routing.module';
import { LoginRoutingModule } from './login/login-routing.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },

    {
        path: 'login',
        component: LoginComponent,
    },
    
    {
        path: 'navbar',
        component: NavbarComponent,
    },
];
