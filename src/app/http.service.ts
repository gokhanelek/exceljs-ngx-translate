import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url: string = environment.url;

  constructor(private http: HttpClient) { }

  public get<T>(path: string): Observable<any> {

    return this.http
      .get<T>(this.url + path)
      .pipe(catchError(this.handleError));
  }

  public handleError(response: any) {
    const errorBody = response.error;

    return observableThrowError(errorBody);
  }
}


