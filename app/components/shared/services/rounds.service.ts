// RoundsService.js
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class RoundsService {
  
  /**
   * Creates a new RoundsService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
  */  
  constructor(private http: Http) {}

  getFriendsRecentRounds(friendsArray: array): Observable<Object[]> {
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.put('/api/rounds/get-friends-recent-rounds', friendsArray, {
      headers: headers
    }).map((res) => res.json());
  } 
  
  getRounds(): Observable<Object[]> {
    return this.http.get('/api/rounds/')
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }  
  
  getRoundInfo(roundId:string): Observable<Object[]> {
    return this.http.get('/api/rounds/' + roundId)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }
  
  getRecentRoundsForCurrentUser(id:string): Observable<Object[]> {
    return this.http.get('/api/rounds/rounds-for-user/' + id)
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