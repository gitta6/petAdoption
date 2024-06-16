import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  //private userSubject = new BehaviorSubject<User>(new User());
  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  };

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          //console.log('Login successful, user:', user);
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome to PetAdoption, ${user.name}!`, 'Login successful.');
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login failed.');
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
    window.location.reload();
  };

  private setUserToLocalStorage(user: User) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
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
    }
    return new User();
  };
}


/*
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  //private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  private userSubject = new BehaviorSubject<User>(new User());
  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  };

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          //this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome to PetAdoption, ${user.name}!`, 'Login successful.');
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login failed.');
        }
      })
    );

  };

  logout() {
    this.userSubject.next(new User());
    sessionStorage.removeItem(USER_KEY);
    window.location.reload();
  };

  getUser(): User {
    return this.userSubject.value;
  };

  } */ /*
}
*/