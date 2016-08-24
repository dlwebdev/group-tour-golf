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
  showFriendsPicker: boolean = false;
  currentHoleIndex: number = -1;
  currentHole: object;
  userScoring: object;
  
  scoreOptions: array: [];
  friends: array: [];
  
  frontNine: object;
  backNine: object;
    
  constructor() {
      this.userScoring = {
          totalScore: 0,
          frontNineTotal: 0,
          backNineTotal: 0,
          scoreToPar: 0,
          frontNineScores: [0,0,0,0,0,0,0,0,0,0],
          backNineScores:  [0,0,0,0,0,0,0,0,0,0,0],
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
    if(this.currentHoleIndex == 9) {
        // This is the "OUT" hole. Skip it.
        this.currentHoleIndex++;    
    }
    //console.log("Current Hole Index: ", this.currentHoleIndex);
    this.currentHole = this.chosenCourse.holes[this.currentHoleIndex];
  }
  
  decrementHole() {
    this.currentHoleIndex--;  
    
    if(this.currentHoleIndex == 9) {
        // This is the "OUT" hole. Skip it.
        this.currentHoleIndex--;    
    }    
    
    //console.log("Current Hole Index: ", this.currentHoleIndex);
    this.currentHole = this.chosenCourse.holes[this.currentHoleIndex];
  }  
  
  showFriends() {
    console.log("Show friends list to choose friend to add to scorecard");
    this.showFriendsPicker = true;
  }
  
  addFriend(index:number) {
    let friendToAdd = this.friends[index];
    this.showFriendsPicker = false;
  }
  
  setHoleScore(score:number) {
      this.userScoring.holes[this.currentHoleIndex] = score;
      if(this.currentHoleIndex < 9) {
          if(this.currentHoleIndex === 9) {
              //console.log("Tally for front 9 happens automatically as you play. THIS WILL NEVER BE REACHED");
          }
          else {
              //console.log("Setting front nine hole score.");
              this.userScoring.frontNineScores[this.currentHoleIndex] = score;
          }
      }
      else {
          //console.log("Setting back nine hole score.");
          let back9ref = this.currentHoleIndex - 10;
          if(back9ref > 19) {
              //console.log("This is either the OUT or TOTAL score. They are tallied automatically.");
          }
          else {
              this.userScoring.backNineScores[back9ref] = score;   
          }
      }
      this.tallyCurrentTotals();
  }
  
  tallyCurrentTotals() {
      //console.log("Calculating Front 9 total off this sub array: ", this.userScoring.frontNineScores.slice(0,9));
      
      let currentFrontNineTotal = this.userScoring.frontNineScores.slice(0,9).reduce(this.add, 0);
      this.userScoring.holes[9] = currentFrontNineTotal;
      this.userScoring.frontNineScores[9] = currentFrontNineTotal;
      
      //console.log("Calculating back 9 total off this sub array: ", this.userScoring.backNineScores.slice(0,9));
      
      let currentBackNineTotal = this.userScoring.backNineScores.slice(0,9).reduce(this.add, 0);
      this.userScoring.holes[19] = currentBackNineTotal;
      this.userScoring.backNineScores[9] = currentBackNineTotal;
      
      this.userScoring.totalScore = currentFrontNineTotal + currentBackNineTotal;
      this.userScoring.holes[20] = this.userScoring.totalScore;
      this.userScoring.backNineScores[10] = this.userScoring.totalScore;
      
      let tmpUserToPar = 0;
      
      // Tally score compared to par. We need to use this.chosenCourse.holes since it holds the pars for holes
      for(var i = 0; i < this.chosenCourse.holes.length; i++) {
          let currentHole = this.chosenCourse.holes[i];
          let userScore = this.userScoring.holes[i];
          
          if((userScore > 0) && (i !== 9) && (i < 18)) {
              if(userScore > currentHole.par) {
                  // User was over par for this hole
                  tmpUserToPar = tmpUserToPar + (userScore - currentHole.par);
              }
              else if(userScore < currentHole.par) {
                  // User was under par for this hole
                  tmpUserToPar = tmpUserToPar - (currentHole.par - userScore); 
              }
          }
          
      }
      this.userScoring.scoreToPar = tmpUserToPar;
  }
  
  add(a:number, b:number) {
      return a + b;
  }  
  
}