import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { AccountsService } from "../../shared/services/accounts.service";

@Component({
    selector: 'my-account',
    templateUrl: 'components/manage/account/account.component.html',
    styleUrls: ['components/manage/account/account.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class AccountManagementComponent {
    account: object = {};

    constructor(private router: Router, private accountsService: AccountsService) {}
    
    ngOnInit() {
        this.getAccount();    
    }
    
    getAccount() {
      this.accountsService.getCurrentAccount()
        .subscribe(
          account => this.account = account,
          error =>  this.errorMessage = <any>error
        );
    }    
}