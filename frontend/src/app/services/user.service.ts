import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUSerRegister } from '../shared/interfaces/IUserRegister';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(this.getTokenFromLocalStorage());

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  };

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome to PetAdoption, ${user.name}!`, 'Login successful.');
        },
        error: (errorResponse) => {
          const errorMessage = errorResponse.error?.message || 'Login failed.';
          this.toastrService.error(errorMessage, 'Login failed.');
        }
      })
    );
  };

  register(userRegister: IUSerRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome to PetAdoption, ${user.name}`, 'Register succesful!');
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Register failed!');
        }
      })
    );
  };

  getUser(): User {
    return this.userSubject.value;
  };

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem('token');
    window.location.reload();
  };

  private setUserToLocalStorage(user: User) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.setItem('token', user.token);
      this.tokenSubject.next(user.token);
    } else {
      console.error('localStorage is not available.');
    };
  };

  private getUserFromLocalStorage(): User {
    if (typeof localStorage !== 'undefined') {
      const userJSON = localStorage.getItem(USER_KEY);
      if (userJSON) return JSON.parse(userJSON) as User;
    } else {
      console.error('localStorage is not available.');
    };
    return new User();
  };

  private getTokenFromLocalStorage(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    } else {
      console.error('localStorage is not available.');
    };
    return null;
  };

  getToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  };

  isLoggedIn(): boolean {
    const user = this.getUser();
    return !!user.token;
  };

  isAdmin(): boolean {
    const user = this.getUser();
    return user.isAdmin; 
  };

};