// AccountsService.js
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class AccountsService {
  
  /**
   * Creates a new AccountsService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
  */  
  constructor(private http: Http) {}
  
  getAccount(id:string): Observable<string[]> {
    return this.http.get('/api/accounts/' + id)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }   
 
  getAllAccounts(): Observable<Object[]> {
    return this.http.get('/api/accounts/')
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  } 
  
  getFriendsRoundScores(id:string): Observable<Object[]> {
    return this.http.get('/api/accounts/' + id + '/get-current-round-scores')
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }  
  
  updateCurrentRound(id:string, roundData:Object): Observable<string[]> {
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.put('/api/accounts/' + id + '/update-current-round', JSON.stringify(roundData), {
      headers: headers
    }).map((res) => res.json().roundData);

  }  
  
  finalizeRound(id:string, roundData:Object): Observable<string[]> {
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.put('/api/accounts/' + id + '/finalize-current-round', JSON.stringify(roundData), {
      headers: headers
    }).map((res) => res.json().roundData);

  }  
  
  getAccountsExcludingUser(id:string): Observable<Object[]> {
    return this.http.get('/api/accounts/exclude/' + id)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }
  
  getUserFriends(): Observable<string[]> {
    return this.http.get('/api/user/friends')
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