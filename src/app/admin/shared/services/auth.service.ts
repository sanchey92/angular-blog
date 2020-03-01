import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {IFirebaseResponse, IUser} from '../../../shared/interfaces';

@Injectable({providedIn: 'root'})
export class AuthService {

  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logOut();
      return null;
    }

    return localStorage.getItem('fb-token');
  }

  private setToken(response: IFirebaseResponse | null) {
    if (response) {
      const expData = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expData.toString());
    } else {
      localStorage.clear();
    }
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error;
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('данный email не найден');
        break;
      case 'INVALID_EMAIL':
        this.error$.next('неверный email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('неверный пароль');
        break;
    }

    return throwError(error);
  }

  logIn(user: IUser): Observable<any> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`;
    user.returnSecureToken = true;
    return this.http.post(url, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  logOut(): void {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
