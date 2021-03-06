import { Component, OnInit, ngAfterViewInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { AuthService } from "../services/auth.service";

@Component({
  selector: 'my-navbar',
  templateUrl: 'components/shared/navbar/navbar.component.html',
  styleUrls: ['components/shared/navbar/navbar.component.css'],  
  directives: [ROUTER_DIRECTIVES]
})
export class NavbarComponent implements OnInit {
    user: any = '';
    userLoggedIn: boolean = false;
    errorMessage: string;

    constructor(private authService: AuthService) { }	

    ngOnInit() {
        this.setLoggedInStatus();
    }
    
    ngAfterViewInit() {
        $( document ).ready(function() {
            $('#ggt-navbar-collapse a').click(function() {
              $('.navbar-toggle').attr('aria-expanded', false);
              $('.navbar-toggle').addClass('collapsed');
              $('.navbar-collapse').attr('aria-expanded', false);
              $('.navbar-collapse').addClass('collapse');
              $('.navbar-collapse').removeClass('in');
            });
        });
    }    
    
    setLoggedInStatus() {
        this.authService.getUserAuthStatus()
            .subscribe(
                resp => {
                    //console.log('Navbar Authentication response: ', resp);
                    if((resp as any).authenticated) {
                        this.userLoggedIn = true;    
                    }
                },
                error =>  this.errorMessage = <any>error
            );         
    } 

}