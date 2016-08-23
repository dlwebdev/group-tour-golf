import { Component, Output, EventEmitter } from '@angular/core';

import { CourseService } from "../../../shared/services/course.service";

@Component({
  selector: 'course-chooser',
  templateUrl: 'components/shared/directives/choose-course/choose-course.directive.html',
  styleUrls: ['components/shared/directives/choose-course/choose-course.directive.css']
})
export class ChooseCourseDirective {
    courses: array = [];
    chosenCourse:object;
    @Output() courseChosen = new EventEmitter();
    errorMessage: string;

    constructor(private courseService: CourseService) {
      this.courseService.getAllCourses()
        .subscribe(
          courses => this.courses = courses,
          error =>  this.errorMessage = <any>error
        );    
    }	
    
    playCourse(i:any) {
        console.log("Selected course: ", this.courses[i]);
        this.chosenCourse = this.courses[i];
        this.courseChosen.emit(this.chosenCourse);
    }
}