import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';

import { RoundsService } from "../../shared/services/rounds.service";
import { CourseService } from "../../shared/services/course.service";

@Component({
    selector: 'my-round-detail',
    templateUrl: 'components/rounds/round-detail/round-detail.component.html',
    styleUrls: ['components/rounds/round-detail/round-detail.component.css'],
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class RoundDetailComponent implements OnInit {
    round: object = {};
    course: object = {};
    frontNine: any;
    backNine: any;    

    constructor(
      private roundsService: RoundsService,
      private courseService: CourseService,
      private route: ActivatedRoute, 
      private router: Router
    ) { }    
    
    ngOnInit() {
      this.getRoundDetail();
    } 
    
    getScoreToParClass(index:number, frontOrBack:string) {
      let classes = "";
      
      if(this.course.holes) {
        let scoreToTest = 0;
        let holeNumber = index;
        
        if(frontOrBack === 'back') {
          scoreToTest = this.round.backNineScores[index];
          holeNumber += 10;
        }
        else {
          scoreToTest = this.round.frontNineScores[index];
        }
        
        if((holeNumber < 19) && (holeNumber !== 9)) {
          let holeDetails = this.course.holes[holeNumber];

          if(scoreToTest > holeDetails.par) {
            let amountOver = scoreToTest - holeDetails.par;
            
            if(amountOver === 1) {
              classes += " bogey";
            }
            else if(amountOver === 2) {
              classes += " double-bogey";
            }
            else {
              classes += " triple-bogey";
            }
          }
          else if(scoreToTest < holeDetails.par) {
            let amountUnder = holeDetails.par - scoreToTest;
            
            if(amountUnder === 1) {
              classes += " birdie";
            }            
            else {
              classes += " eagle";
            }
          }
          else {
            classes += " par";
          }
        }
      }
      
      return classes;
    }

    getRoundDetail() {
      this.sub = this.route.params.subscribe(params => {
        if (params['id'] !== undefined) {
          let roundId = params['id'];
          
          this.roundsService.getRoundInfo(roundId)
            .subscribe(
              round => {
                this.round = round;
                this.getCourse(round.courseId);
              },
              error =>  this.errorMessage = <any>error
            ); 

        }
      });      
    }
    
    getCourse(id:string) {
      this.courseService.getCourse(id)
        .subscribe(
          resp => {
            this.course = resp;
            this.frontNine = this.course.holes.slice(0, 10);
            this.backNine = this.course.holes.slice(10);            
          },
          error => this.errorMessage = <any>error
        );
    }     
}