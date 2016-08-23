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
  
  frontNine: object;
  backNine: object;
    
  constructor() {
      this.userScoring = {
          totalScore: 0,
          frontNineScores: [0,0,0,0,0,0,0,0,0,0],
          backNineScores: [0,0,0,0,0,0,0,0,0,0,0],
          holes: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      }
  }
    
  courseChosen(course) {
    // Handle the event
    console.log("I HAVE RECEIVED THE CHOSEN COURSE!!", course);
    
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
  
  decrementHole() {
    this.currentHoleIndex--;  
    //console.log("Current Hole Index: ", this.currentHoleIndex);
    this.currentHole = this.chosenCourse.holes[this.currentHoleIndex];
  }
  
}