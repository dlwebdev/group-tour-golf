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

import { AuthService } from "./components/shared/services/auth.service";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        routing
    ],
    providers: [
        AuthService
    ],    
    declarations: [
        AppComponent,
        NavbarComponent,
        AboutComponent,
        LoginComponent,
        HomeComponent,
        DashboardComponent,
        FriendsComponent,
        QuickstartComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
