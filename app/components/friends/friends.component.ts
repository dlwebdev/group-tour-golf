import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'my-friends',
    templateUrl: 'components/friends/friends.component.html',
    styleUrls: ['components/friends/friends.component.css'],
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class FriendsComponent {}