import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


export interface Patient {
  _id: string;
  firstname: string;
  surname: string;
  birdthdate: string;
  password: string;
  email: string;
  address: string;
  city: string;
  state: string;
  sex: string;
  insuranceNumber: string;
  alergies: string[];
  drugs: Drug[];
  badHabits: string[];
  doctors: string[];
  rating: string[];
  notes: string[];
}

export interface Drug {
  name: string;
  times: string[];
}

@Injectable({
  providedIn: 'root'
})
export class LoginPageService {
  public onLogin: EventEmitter<Patient> = new EventEmitter<Patient>();

  // urlBase = 'http://itsovy.sk:1203/login';
  url = 'http://localhost:3330/login';

  constructor(private http: HttpClient) {
  }

  getLoginDataViaPost(email: string, password: string): Observable<Patient> {
    console.log('email: ' + email + ', password: ' + password);
    const loginDataObservable = this.http.post<Patient>(this.url, {email, password});
    console.log(loginDataObservable);
    return loginDataObservable;

  }
}
