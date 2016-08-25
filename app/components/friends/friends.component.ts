import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { AuthService } from "../shared/services/auth.service";
import { AccountsService } from "../shared/services/accounts.service";
import { FriendsService } from "../shared/services/friends.service";

@Component({
    selector: 'my-friends',
    templateUrl: 'components/friends/friends.component.html',
    styleUrls: ['components/friends/friends.component.css'],
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class FriendsComponent {
    user: any = {};
    friends: any = [];
    friendsWithDetails: any = [];
    accounts: array = [];
    errorMessage: string = '';

    constructor(private accountsService: AccountsService, private friendsService:FriendsService, private authService: AuthService) { }    
    
    ngOnInit() {
      this.friends = [];
      this.friendsWithDetails = [];
      this.checkIfLoggedIn();
    } 
    
    checkIfLoggedIn() {
      // If the user is logged in it will return the user object, otherwise will redirect to login
      this.authService.getCurrentUser()
            .subscribe(
                user => {
                    console.log('Current User response: ', user);
                    this.user = user;
                    
                    if(this.user.id) {
                      this.getAccounts();
                      this.getFriends();                      
                    }
                    else {
                      console.log("No User returned.");
                      window.location.href = '/auth/twitter';
                    }
                },
                error =>  this.errorMessage = <any>error
            );      
    }
    
    addFriend(index:number) {
      let friendToAdd = this.accounts[index];
      console.log("Will add account as friend (just user id so we always get up to date info): ", friendToAdd);
      this.friendsWithDetails.push(friendToAdd);
      
      this.friendsService.addFriend(this.user.id, friendToAdd.id)
        .subscribe(
          account => {
            //this.friends.push(friendToAdd);
            console.log("Friend successfully added.");
          },
          error =>  this.errorMessage = <any>error
        );      
    }
    
    getAccounts() {
      this.accountsService.getAccountsExcludingUser(this.user.id)
        .subscribe(
          accounts => this.accounts = accounts,
          error =>  this.errorMessage = <any>error
        );
    }  
    
    getFriends() {
      this.accountsService.getUserFriends()
        .subscribe(
          account => {
            if(account.friends) {
              this.friends = account.friends;
              this.friendsWithDetails = account.friendsWithDetails;
            }
          },
          error =>  this.errorMessage = <any>error
        );
    }    
}