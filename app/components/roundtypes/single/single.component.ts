import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'my-single',
    templateUrl: 'components/roundtypes/single/single.component.html',
    styleUrls: ['components/roundtypes/single/single.component.css'],
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class SingleRoundComponent {}