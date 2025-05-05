import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        children: [
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
                path: 'navbar',
                loadComponent: () =>
                    import('./home/navbar/navbar.component').then((c) => c.NavbarComponent),
            },
            {
                path: 'home',
                loadComponent: () =>
                    import('./home/home.component').then((c) => c.HomeComponent),
            },
            {
                path: 'footer',
                loadComponent: () =>
                    import('./home/footer/footer.component').then((c) => c.FooterComponent),
            },
            {
                path: 'profile',
                loadComponent: () =>
                    import('./home/profile/profile.component').then((c) => c.ProfileComponent),
            },
            {
                path: 'liked-songs',
                loadComponent: () =>
                    import('./home/liked-songs/liked-songs.component').then((c) => c.LikedSongsComponent),
            },
            {
                path: 'about-us',
                loadComponent: () =>
                    import('./home/about-us/about-us.component').then((c) => c.AboutUsComponent),
            },
            {
                path: 'playing-now',
                loadComponent: () =>
                    import('./home/playing-now/playing-now.component').then((c) => c.PlayingNowComponent),
            },
            {
                path: 'settings',
                loadComponent: () =>
                    import('./home/settings/settings.component').then((c) => c.SettingsComponent),
            },
            {
                path: 'register',
                loadComponent: () =>
                    import('./home/register/register.component').then((c) => c.RegisterComponent),
            },
            {
                path: 'faq',
                loadComponent: () =>
                    import('./home/faq/faq.component').then((c) => c.FaqComponent),
            },
            {
                path: 'edit-profile',
                loadComponent: () =>
                    import('./home/edit-profile/edit-profile.component').then((c) => c.EditProfileComponent),
            },
            { path: '', redirectTo: 'login', pathMatch: 'full' }

        ]
    },
    {
        path: '**', redirectTo: 'home'
    },



];
