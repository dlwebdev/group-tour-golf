import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'my-login',
    templateUrl: 'components/login/login.component.html',
    styleUrls: ['components/login/login.component.css'],
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class LoginComponent {}