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
    
  constructor() {
      this.userScoring = {
          totalScore: 0,
          holes: []
      }
  }
    
  courseChosen(course) {
    // Handle the event
    console.log("I HAVE RECEIVED THE CHOSEN COURSE!!", course);
    this.chosenCourse = course;
    this.courseHasBeenChosen = true;
    console.log("Hide the course chooser and BEGIN ROUND HERE.");
    this.currentHoleIndex = 0;
    this.currentHole = this.chosenCourse.holes[this.currentHoleIndex];
  }    
}