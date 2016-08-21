import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'my-dashboard',
    templateUrl: 'components/dashboard/dashboard.component.html',
    styleUrls: ['components/dashboard/dashboard.component.css'],
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class DashboardComponent {}