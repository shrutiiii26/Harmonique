import { Routes } from '@angular/router';
import { HomeRoutingModule } from './home/home-routing.module';
import { LoginRoutingModule } from './login/login-routing.module';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeRoutingModule,
    },

    {
        path: 'login',
        component: LoginComponent,
    },
];
