import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { CourseService } from "../../../shared/services/course.service";

@Component({
    selector: 'my-add-course',
    templateUrl: 'components/manage/courses/add/add-course.component.html',
    styleUrls: ['components/manage/courses/add/add-course.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class AddCourseComponent {
  course: object = {
      name: '',
      teeBox: '',
      record: {
        score: '0',
        userId: '0',
        userName: ''
      },
      holes: [
        {hole: '1', distance: 0, par:0},
        {hole: '2', distance: 0, par:0},
        {hole: '3', distance: 0, par:0},
        {hole: '4', distance: 0, par:0},
        {hole: '5', distance: 0, par:0},
        {hole: '6', distance: 0, par:0},
        {hole: '7', distance: 0, par:0},
        {hole: '8', distance: 0, par:0},
        {hole: '9', distance: 0, par:0},
        {hole: 'Out', distance: 0, par:0},
        {hole: '10', distance: 0, par:0},
        {hole: '11', distance: 0, par:0},
        {hole: '12', distance: 0, par:0},
        {hole: '13', distance: 0, par:0},
        {hole: '14', distance: 0, par:0},
        {hole: '15', distance: 0, par:0},
        {hole: '16', distance: 0, par:0},
        {hole: '17', distance: 0, par:0},
        {hole: '18', distance: 0, par:0},
        {hole: 'In', distance: 0, par:0},
        {hole: 'Total', distance: 0, par:0}
      ],
      location: ''
  };
  
  constructor(private router: Router, private courseService: CourseService) {}
    
  saveCourse() {
    this.course.name = this.course.name + " - " + this.course.teeBox;
    
    this.courseService.createCourse(this.course)
      .subscribe(
        this.router.navigate(['/manage/courses']);
        error =>  this.errorMessage = <any>error
      );
  }
    
}