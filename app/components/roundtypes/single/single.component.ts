import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { AuthService } from "../../shared/services/auth.service";
import { AccountsService } from "../../shared/services/accounts.service";

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
  showSaveRound: boolean = false;
  currentHoleIndex: number = -1;
  currentHole: object;
  userScoring: object;
  user: object;
  
  scoreOptions: array = [];
  friends: array = [];
  friendsWithDetails: any = [];
  friendsToTrack: array = [];
  
  frontNine: object;
  backNine: object;
    
  constructor(private router: Router, private accountsService: AccountsService, private authService: AuthService) {
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
  
  ngOnInit() {
    this.checkIfLoggedIn();
    // Add friends
    this.addAvailableFriends();
  }
  
  checkIfLoggedIn() {
      // If the user is logged in it will return the user object, otherwise will redirect to login
      this.authService.getCurrentUser()
            .subscribe(
                user => {
                    console.log('Current User response: ', user);
                    this.user = user;
                    
                    if(!this.user.id) {
                      window.location.href = '/auth/twitter';                     
                    }
                },
                error =>  this.errorMessage = <any>error
            );      
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
  
  addAvailableFriends() {
    
      this.accountsService.getUserFriends()
        .subscribe(
          account => {
            if(account.friends) {
              this.friends = account.friends;
              this.getFriendsDetailed();
            }            
          },
          error =>  this.errorMessage = <any>error
        );    
  }
  
  getFriendsDetailed() {
        this.accountsService.getFriendsDetailed(this.friends)
                  .subscribe(
                    friendsDetailed => {
                      this.friendsWithDetails = friendsDetailed;
                    },
                    error =>  this.errorMessage = <any>error
                  );        
  }  
  
  incrementHole() {
    this.currentHoleIndex++;
    if(this.currentHoleIndex == 9) {
        // This is the "OUT" hole. Skip it.
        this.currentHoleIndex++;    
    }
    //console.log("Current Hole Index: ", this.currentHoleIndex);
    this.currentHole = this.chosenCourse.holes[this.currentHoleIndex];
    
    this.saveRoundData();
  }
  
  saveRoundData() {
    //console.log("SAVING CURRENT ROUND DATA.");
    
    let currentRoundData = {
      chosenCourse: this.chosenCourse._id,
      currentHoleIndex: this.currentHoleIndex,
      userScoring: this.userScoring
    };
    
    this.accountsService.updateCurrentRound(this.user.id, currentRoundData)
      .subscribe(
        round => {
          //console.log("Round was successfully saved: ", round);
        },
        error =>  this.errorMessage = <any>error
      );      
      
    this.updateFriendsScores();
  }
  
  updateFriendsScores() {
    for(let i = 0; i < this.friendsToTrack.length; i++) {
      let frnd = this.friendsToTrack[i];
      console.log("Update scores for friend: ", frnd);
      
      this.accountsService.getFriendsRoundScores(frnd.id)
        .subscribe(
          acct => {
            // just returns this users current account which contains currentRound IF they are playing and saving scores
            console.log("Friends current account: ", acct);
            this.friendsToTrack[i].userScoring = acct.currentRound.userScoring;
          },
          error =>  this.errorMessage = <any>error
        );        
    }
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
  
  showFriendPicker() {
    //console.log("Show friends list to choose friend to add to scorecard");
    this.showFriendsPicker = true;
  }
  
  addFriend(index:number) {
    let friendToAdd = this.friendsWithDetails[index];
    
    friendToAdd.userScoring = {
          totalScore: 0,
          frontNineTotal: 0,
          backNineTotal: 0,
          scoreToPar: 0,
          frontNineScores: [0,0,0,0,0,0,0,0,0,0],
          backNineScores:  [0,0,0,0,0,0,0,0,0,0,0],
          holes: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    };
    
    this.friendsToTrack.push(friendToAdd);
    
    //console.log("Add this users scores to scorecard.");
    
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
      
      if(this.currentHoleIndex === 18) {
        //console.log("Just entered score for 18th hole.");
        this.saveRoundData();
        this.showSaveRound = true;
      }
  }
  
  finalizeRound() {
    // When save round button is clicked it will add an entry into account rounds and clear the currentRound object field.
    //console.log("When save round button is clicked it will add an entry into account rounds and clear the currentRound object field.");
      
    this.userScoring.frontNineScores = [];
    this.userScoring.backNineScores = [];
    this.userScoring.holes = [];
    this.userScoring.roundComplete = true;
      
    let currentRoundData = {
      userId: this.user.id,
      userName: this.user.displayname,
      score: this.userScoring.totalScore,
      courseId: this.chosenCourse._id,
      courseName: this.chosenCourse.name,
      chosenCourse: this.chosenCourse._id,
      currentHoleIndex: this.currentHoleIndex,
      scoreToPar: this.userScoring.scoreToPar,
      totalScore: this.userScoring.totalScore,
      userScoring: this.userScoring
    };      
      
    this.accountsService.finalizeRound(this.user.id, currentRoundData)
      .subscribe(
        round => {
          //console.log("Round was successfully finalized: ", round);
          this.router.navigate(['/dashboard']);
        },
        error =>  this.errorMessage = <any>error
      );       
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