import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { CourseService } from "../../shared/services/course.service";

@Component({
    selector: 'my-courses',
    templateUrl: 'components/manage/courses/courses.component.html',
    styleUrls: ['components/manage/courses/courses.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class CourseManagementComponent {
    name: string = "About Us";
    courses: array = [];

    constructor(private router: Router, private courseService: CourseService) {}
    
    ngOnInit() {
        this.getAllCourses();    
    }
    
    editCourse(id:string) {
      this.router.navigate(['/manage/courses/edit/', id]);
    }      
    
    getAllCourses() {
      this.courseService.getAllCourses()
        .subscribe(
          courses => this.courses = courses,
          error =>  this.errorMessage = <any>error
        );
    }    
}