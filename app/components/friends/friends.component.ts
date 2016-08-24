import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { AuthService } from "../shared/services/auth.service";
import { AccountsService } from "../shared/services/accounts.service";

@Component({
    selector: 'my-friends',
    templateUrl: 'components/friends/friends.component.html',
    styleUrls: ['components/friends/friends.component.css'],
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class FriendsComponent {
    user: any = {};
    friends: array = [];
    accounts: array = [];
    errorMessage: string = '';

    constructor(private accountsService: AccountsService, private authService: AuthService) {}    
    
    ngOnInit() {
      this.checkIfLoggedIn();
    } 
    
    checkIfLoggedIn() {
      this.authService.getUserAuthStatus()
            .subscribe(
                resp => {
                    console.log('Authentication response: ', resp);
                    if((resp as any).authenticated) {
                        this.getAccounts();
                        this.getFriends();
                    }
                    else {
                        window.location.href = '/auth/twitter';
                    }
                },
                error =>  this.errorMessage = <any>error
            );      
    }
    
    getAccounts() {
      this.accountsService.getAccounts()
        .subscribe(
          accounts => this.accounts = accounts,
          error =>  this.errorMessage = <any>error
        );
    }  
    
    getFriends() {
      this.accountsService.getUserFriends()
        .subscribe(
          account => this.friends = account.friends,
          error =>  this.errorMessage = <any>error
        );
    }    
}