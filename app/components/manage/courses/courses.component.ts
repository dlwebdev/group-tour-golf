import { Component, OnInit } from '@angular/core';

import { CourseService } from "../../shared/services/course.service";

@Component({
    selector: 'my-courses',
    templateUrl: 'components/manage/courses/courses.component.html',
    styleUrls: ['components/manage/courses/courses.component.css']
})
export class CourseManagementComponent {
    name: string = "About Us";
    courses: array = [];

    constructor(private courseService: CourseService) {}
    
    ngOnInit() {
        this.getAllCourses();    
    }
    
    getAllCourses() {
      this.courseService.getAllCourses()
        .subscribe(
          courses => this.courses = courses,
          error =>  this.errorMessage = <any>error
        );
    }    
}