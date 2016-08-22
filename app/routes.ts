import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FriendsComponent } from './components/friends/friends.component';
import { QuickstartComponent } from './components/quickstart/quickstart.component';

import { SingleRoundComponent } from './components/roundtypes/single/single.component';
//import { FoursomeComponent } from './components/roundtypes/uptofoursome/uptofoursome.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, terminal: true },
    { path: 'quickstart', component: QuickstartComponent },
    { path: 'quickstart/start-round/single', component: SingleRoundComponent },
    //{ path: 'quickstart/start-round/multi', component: FoursomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'friends', component: FriendsComponent }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
