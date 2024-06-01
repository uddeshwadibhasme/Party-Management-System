import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiURL = "https://ap.greatfuturetechno.com";

  /*------------------------------------------
  --------------------------------------------
  Http Header Options
  --------------------------------------------
  --------------------------------------------*/
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private httpClient: HttpClient) { }

  /**
   * Write code on Method
   *
   * @return response()
   */

  setHeaders(headers: HttpHeaders) {
    this.headers = headers;
  }

  getHeaders(): HttpHeaders {
    return this.headers;
  }

  login(username: string, password: string): Observable<any> {
    const body = new FormData();
    body.append('username', username);
    body.append('password', password);
    return this.httpClient.post(this.apiURL + '/login/', body);
  }

  logout(): Observable<any> {
    const token = sessionStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Token ' + token);
    return this.httpClient.post(this.apiURL + '/logout/', { headers: headers });
  }

  getAll(): Observable<any> {
    const token = sessionStorage.getItem('Token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', 'Token ' + token);
      return this.httpClient.get(this.apiURL + '/party/', { headers: headers })
        .pipe(
          catchError(this.errorHandler)
        );
    } else {
      return throwError("Token is missing");
    }
  }


  /**
   * Write code on Method
   *
   * @return response()
   */
  create(post: any): Observable<any> {
    const token = sessionStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Token ' + token).set('Content-Type', 'application/json');
    return this.httpClient.post(this.apiURL + '/party/', JSON.stringify(post), { headers: headers })

      .pipe(
        catchError(this.errorHandler)
      )
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  find(id: number): Observable<any> {

    const token = sessionStorage.getItem('Token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', 'Token ' + token);
      return this.httpClient.get(this.apiURL + '/party/?id=' + id, { headers: headers })
        .pipe(
          catchError(this.errorHandler)
        );
    } else {
      return throwError("Token is missing");
    }
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  update(id: number, post: Post): Observable<any> {

    const token = sessionStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Token ' + token).set('Content-Type', 'application/json');
    return this.httpClient.put(this.apiURL + '/party/?id=' + id, JSON.stringify(post), { headers: headers })

      .pipe(
        catchError(this.errorHandler)
      )
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  delete(id: number) {
    const token = sessionStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Token ' + token);
    return this.httpClient.delete(this.apiURL + '/party/?id=' + id, { headers: headers })

      .pipe(
        catchError(this.errorHandler)
      )
  }

  /** 
   * Write code on Method
   *
   * @return response()
   */
  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}