// FriendsService.js
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class FriendsService {
  
  /**
   * Creates a new FriendsService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
  */  
  constructor(private http: Http) {}
  
  getFriends(userId: string): Observable<Object[]> {
    return this.http.get('/api/accounts/' + userId + '/friends')
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }
  
  getFriendInfo(id:string): Observable<string[]> {
    return this.http.get('/api/accounts/' + id)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  } 
  
  addFriend(userId:string, friendId:string): Observable<string[]> {
    return this.http.get('/api/accounts/' + userId + '/addFriend/' + friendId);
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }  
  
  removeFriend(userId:string, friendId:string): Observable<string[]> {
    return this.http.get('/api/accounts/' + userId + '/removeFriend/' + friendId);
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
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