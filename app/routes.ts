import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, terminal: true },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
