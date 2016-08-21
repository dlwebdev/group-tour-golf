import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'my-quickstart',
    templateUrl: 'components/quickstart/quickstart.component.html',
    styleUrls: ['components/quickstart/quickstart.component.css'],
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class QuickstartComponent {}