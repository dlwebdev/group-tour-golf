import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';

import { CourseService } from "../../../shared/services/course.service";

@Component({
    selector: 'my-edit-course',
    templateUrl: 'components/manage/courses/edit/edit-course.component.html',
    styleUrls: ['components/manage/courses/edit/edit-course.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class EditCourseComponent {
  course: object = {};
  pollId: string = '';
  
  constructor(private router: Router, private route: ActivatedRoute, private courseService: CourseService) {}
    
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        let id = params['id'];
        this.courseId = id;
        this.navigated = true;
        this.getCourse(id);
      } else {
        console.log('No id detected.');
      }
    });    
  }
  
  getCourse(id:string) {
    this.courseService.getCourse(id)
      .subscribe(
        course => this.course = course,
        error =>  this.errorMessage = <any>error
      );
  }   
    
  saveCourse() {
    this.courseService.updateCourse(this.course)
      .subscribe(
        this.router.navigate(['/manage/courses']);
        error =>  this.errorMessage = <any>error
      );
  }
    
}