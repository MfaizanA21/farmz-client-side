import { inject, Injectable } from '@angular/core';
import { User } from '../user.model';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private httpClient = inject(HttpClient);

  createUser(user: User) {
    const { fname, lname, email, password } = user;
    return this.httpClient
      .post('http://localhost:3000/auth/signup', {
        firstname: fname,
        lastname: lname,
        email,
        password,
      })
      .pipe(
        catchError((error) => {
          return throwError(() => new Error('Failed to create an account'));
        })
      );
  }
}
