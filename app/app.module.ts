import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { routing } from "./routes";

import { AppComponent }  from './app.component';
import { AboutComponent } from "./components/about/about.component";
import { HomeComponent } from "./components/home/home.component";
import { NavbarComponent } from "./components/shared/navbar/navbar.component";
import { LoginComponent } from "./components/login/login.component";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FriendsComponent } from './components/friends/friends.component';
import { QuickstartComponent } from './components/quickstart/quickstart.component';

import { SingleRoundComponent } from './components/roundtypes/single/single.component';
//import { FoursomeComponent } from './components/roundtypes/uptofoursome/uptofoursome.component';

import { RoundsComponent } from './components/rounds/rounds.component';
import { RoundDetailComponent } from './components/rounds/round-detail/round-detail.component';

import { CourseManagementComponent } from './components/manage/courses/courses.component';
import { AddCourseComponent } from './components/manage/courses/add/add-course.component';
import { EditCourseComponent } from './components/manage/courses/edit/edit-course.component';

import { AccountManagementComponent } from './components/manage/account/account.component';

import { AuthService } from "./components/shared/services/auth.service";
import { CourseService } from "./components/shared/services/course.service";
import { FriendsService } from "./components/shared/services/friends.service";
import { AccountsService } from "./components/shared/services/accounts.service";
import { RoundsService } from "./components/shared/services/rounds.service";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        routing
    ],
    providers: [
        AuthService,
        CourseService,
        FriendsService,
        AccountsService,
        RoundsService
    ],    
    declarations: [
        AppComponent,
        NavbarComponent,
        AboutComponent,
        LoginComponent,
        HomeComponent,
        DashboardComponent,
        AccountManagementComponent,
        FriendsComponent,
        SingleRoundComponent,
        RoundsComponent,
        RoundDetailComponent,
        //FoursomeComponent,
        QuickstartComponent,
        //Course Management Components
        CourseManagementComponent,
        AddCourseComponent,
        EditCourseComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
