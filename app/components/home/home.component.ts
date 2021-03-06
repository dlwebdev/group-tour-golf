import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Cookie } from 'ng2-cookies/ng2-cookies';

//import './rxjs-operators';

import { AuthService } from "../shared/services/auth.service";

@Component({
    selector: 'my-home',
    templateUrl: 'components/home/home.component.html',
    styleUrls: ['components/home/home.component.css'],
    directives: [FORM_DIRECTIVES]
})
export class HomeComponent implements OnInit {
    name: string = "Home";
    users: {};
    
    user: any = '';
    userId: any = '';    
    
    newName: string = '';
    cityToSearch: string = '';
    errorMessage: string;
    bars: any[] = [];
    isLoading: boolean = false;    

    constructor(private authService: AuthService) { }
    
    /**
    * Get the names OnInit
    */
    ngOnInit() {
        let userCookie = Cookie.get('user');
        console.log("user: ", userCookie);
        
        this.authService.getCurrentUser()
            .subscribe(
                data => {
                    this.user = data;
                    Cookie.set('user', data);
                },
                error =>  this.errorMessage = <any>error
            );        
    }    
    
}