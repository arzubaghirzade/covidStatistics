import { AppService } from '../app/app.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private appService: AppService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((evt: any) => {
        if (evt instanceof HttpResponse) {
          if (
            (evt.status == 200 || evt.status == 201) &&
            request.method != 'GET'
          ) {
            console.log('Success!');
          }
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          try {
            console.log(err);
          } catch (e) {
            const error = err.error.message || err.statusText;
            return throwError(error);
          }
        }
        return of(err);
      })
    );
  }
}
