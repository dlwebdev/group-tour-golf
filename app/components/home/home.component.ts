import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Http } from "@angular/http";
//import './rxjs-operators';

@Component({
    selector: 'my-home',
    templateUrl: 'components/home/home.component.html',
    styleUrls: ['components/home/home.component.css'],
    directives: [FORM_DIRECTIVES]
})
export class HomeComponent implements OnInit {
    name: string = "Home";
    users: {};
    
    newName: string = '';
    cityToSearch: string = '';
    errorMessage: string;
    bars: any[] = [];
    isLoading: boolean = false;    

    constructor(private http: Http) {
        console.log("GETTING USERS!");
        
        http.get("/api/user")
            .map(data => data.json())
            .subscribe((data) => this.users = data);
    }
    
    /**
    * Get the names OnInit
    */
    ngOnInit() {
        console.log('Go to your home');
    }    
    
}