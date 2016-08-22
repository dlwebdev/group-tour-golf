import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'my-uptofoursome',
    templateUrl: 'components/roundtypes/uptofoursome/uptofoursome.component.html',
    styleUrls: ['components/roundtypes/uptofoursome/uptofoursome.component.css'],
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class FoursomeRoundComponent {}