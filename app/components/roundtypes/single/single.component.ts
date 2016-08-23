import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { ChooseCourseDirective } from "../../shared/directives/choose-course/choose-course.directive";

@Component({
    selector: 'my-single',
    templateUrl: 'components/roundtypes/single/single.component.html',
    styleUrls: ['components/roundtypes/single/single.component.css'],
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES, ChooseCourseDirective]
})
export class SingleRoundComponent {
  chosenCourse: object;
  courseHasBeenChosen: boolean = false;
  currentHoleIndex: number = -1;
  currentHole: object;
  userScoring: object;
  
  scoreOptions: array: [];
  
  frontNine: object;
  backNine: object;
    
  constructor() {
      this.userScoring = {
          totalScore: 0,
          frontNineScores: [0,0,0,0,0,0,0,0,0,0],
          backNineScores: [0,0,0,0,0,0,0,0,0,0,0],
          holes: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      }
      
      this.scoreOptions = [1,2,3,4,5,6,7,8];
  }
    
  courseChosen(course) {
    // Handle the event
    this.chosenCourse = course;
    
    this.frontNine = this.chosenCourse.holes.slice(0, 10);
    this.backNine = this.chosenCourse.holes.slice(10);
    
    this.courseHasBeenChosen = true;
    
    console.log("Hide the course chooser and BEGIN ROUND HERE.");
    
    this.currentHoleIndex = 0;
    this.currentHole = this.chosenCourse.holes[this.currentHoleIndex];
  }    
  
  incrementHole() {
    this.currentHoleIndex++;
    //console.log("Current Hole Index: ", this.currentHoleIndex);
    this.currentHole = this.chosenCourse.holes[this.currentHoleIndex];
  }
  
  setHoleScore(score:number) {
      this.userScoring.holes[this.currentHoleIndex] = score;
      if(this.currentHoleIndex < 10) {
          if(this.currentHoleIndex === 10) {
              console.log("Tally for front 9 happens automatically as you play.");
          }
          else {
              console.log("Setting front nine hole score.");
              this.userScoring.frontNineScores[this.currentHoleIndex] = score;
          }
      }
      else {
          console.log("Setting back nine hole score.");
          let back9ref = this.currentHoleIndex - 10;
          if(back9ref > 19) {
              console.log("This is either the OUT or TOTAL score. They are tallied automatically.");
          }
          else {
              this.userScoring.backNineScores[back9ref] = score;   
          }
      }
      this.tallyCurrentTotals();
  }
  
  tallyCurrentTotals() {
      let currentFrontNineTotal = this.userScoring.frontNineScores.reduce(this.add, 0);
      this.userScoring.holes[10] = currentFrontNineTotal;
      this.userScoring.frontNineScores[10] = currentFrontNineTotal;
      
      let currentBackNineTotal = this.userScoring.backNineScores.reduce(this.add, 0);
      this.userScoring.holes[19] = currentBackNineTotal;
      this.userScoring.backNineScores[10] = currentBackNineTotal;
      
      this.userScoring.totalScore = currentFrontNineTotal + currentBackNineTotal;
      this.userScoring.holes[20] = this.userScoring.totalScore;
      this.userScoring.backNineScores[11] = this.userScoring.totalScore;
  }
  
  add(a:number, b:number) {
      return a + b;
  }  
  
  decrementHole() {
    this.currentHoleIndex--;  
    //console.log("Current Hole Index: ", this.currentHoleIndex);
    this.currentHole = this.chosenCourse.holes[this.currentHoleIndex];
  }
  
}