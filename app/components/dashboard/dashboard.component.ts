import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { AuthService } from "../shared/services/auth.service";
import { AccountsService } from "../shared/services/accounts.service";
import { RoundsService } from "../shared/services/rounds.service";

@Component({
    selector: 'my-dashboard',
    templateUrl: 'components/dashboard/dashboard.component.html',
    styleUrls: ['components/dashboard/dashboard.component.css'],
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class DashboardComponent {
    user: object = {};
    recentRounds: array = [];
    
    constructor(private router: Router, private accountsService: AccountsService, private authService: AuthService, private roundsService: RoundsService) { }    
    
    ngOnInit() {
      this.checkIfLoggedIn();
    } 
    
    checkIfLoggedIn() {
      // If the user is logged in it will return the user object, otherwise will redirect to login
      this.authService.getCurrentUser()
            .subscribe(
                user => {
                    //console.log('Current User response: ', user);
                    this.user = user;
                    
                    if(this.user.id) {
                      this.getRecentRounds();
                    }
                    else {
                      console.log("No User returned.");
                      window.location.href = '/auth/twitter';
                    }
                },
                error =>  this.errorMessage = <any>error
            );      
    }
    
    getRecentRounds() {
      this.roundsService.getRecentRoundsForCurrentUser(this.user.id)
        .subscribe(
          rounds => {
            console.log("Setting recentRounds to: ", rounds);
            this.recentRounds = rounds;
          },
          error =>  this.errorMessage = <any>error
        );      
    } 
    
    viewPreviousRound(id:string) {
      this.router.navigate(['/rounds/round-detail', id]);
    }
}