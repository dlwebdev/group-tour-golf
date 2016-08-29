import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FriendsComponent } from './components/friends/friends.component';
import { QuickstartComponent } from './components/quickstart/quickstart.component';

import { SingleRoundComponent } from './components/roundtypes/single/single.component';
//import { FoursomeComponent } from './components/roundtypes/uptofoursome/uptofoursome.component';

import { CourseManagementComponent } from './components/manage/courses/courses.component';
import { AddCourseComponent } from './components/manage/courses/add/add-course.component';
import { EditCourseComponent } from './components/manage/courses/edit/edit-course.component';

import { RoundsComponent } from './components/rounds/rounds.component';
import { RoundDetailComponent } from './components/rounds/round-detail/round-detail.component';

import { AccountManagementComponent } from './components/manage/account/account.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, terminal: true },
    { path: 'quickstart', component: QuickstartComponent },
    { path: 'quickstart/start-round/single', component: SingleRoundComponent },
    //{ path: 'quickstart/start-round/multi', component: FoursomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    // Manage account
    { path: 'manage/account', component: AccountManagementComponent },
    // Manage friends
    { path: 'manage/friends', component: FriendsComponent },
    // Round Detail
    { path: 'rounds/round-detail/:id', component: RoundDetailComponent },
    { path: 'rounds', component: RoundsComponent },
    // Manage courses
    { path: 'manage/courses', component: CourseManagementComponent },
    { path: 'manage/courses/add', component: AddCourseComponent },
    { path: 'manage/courses/edit/:id', component: EditCourseComponent }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
