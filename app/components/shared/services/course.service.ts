// CourseService.js
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class CourseService {
  
  /**
   * Creates a new PollService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
  */  
  constructor(private http: Http) {}

  createCourse(data:Object): Observable<string[]> {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http.post('/api/courses', JSON.stringify(data), {
      headers: headers
    }).map((res) => res.json().data);
  } 
  
  getAllCourses(): Observable<Object[]> {
    return this.http.get('/api/courses')
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }
  
  getCourse(id:string): Observable<string[]> {
    return this.http.get('/api/courses/' + id)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }   

  updateCourse(course:Object): Observable<string[]> {
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.put('/api/courses/' + course._id, JSON.stringify(course), {
      headers: headers
    }).map((res) => res.json().course);

  } 

  /**
    * Handle HTTP error
  */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }  
}