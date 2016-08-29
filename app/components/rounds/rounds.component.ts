import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { RoundsService } from "../shared/services/rounds.service";

@Component({
    selector: 'my-rounds',
    templateUrl: 'components/rounds/rounds.component.html',
    styleUrls: ['components/rounds/rounds.component.css'],
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class RoundsComponent {
    rounds: any = [];

    constructor(private roundsService: RoundsService, private router: Router) { }    
    
    ngOnInit() {
      this.getRounds();
    } 
    
    getRounds() {
      this.roundsService.getRounds()
            .subscribe(
              rounds => {
                console.log("Rounds: ", rounds);
                this.rounds = rounds;
              },
              error =>  this.errorMessage = <any>error
            );      
    }
    
    viewPreviousRound(id:string) {
      this.router.navigate(['/rounds/round-detail', id]);
    }    
}