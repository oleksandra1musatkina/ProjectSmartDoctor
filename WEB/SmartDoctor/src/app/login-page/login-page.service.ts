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
  examintaions: Examination[];
  image: string;
}

export interface Examination {
  type: string;
  doctor: string;
  date: string;
  note: string;
}

export interface Doctor {
  _id: string;
  firstname: string;
  surname: string;
  birdthdate: string;
  password: string;
  email: string;
  address: string;
  city: string;
  patients: string[];
  insurances: string[];
  opening: {};
  rating: {}[];
  maxpatients: string;
  estimatedpatienttime: string;
  image: string;
}


export interface Drug {
  name: string;
  times: string[];
}

@Injectable({
  providedIn: 'root'
})
export class LoginPageService {
  public onLogin: EventEmitter<boolean> = new EventEmitter<boolean>();

  // urlBase = 'http://itsovy.sk:1203/login';
  // url = 'http://localhost:3330/login';
  url = 'http://itsovy.sk:3309/';
  // url = 'http://localhost:3309/';

  constructor(private http: HttpClient) {
  }

  getLoginDataViaPost(email: string, password: string): Observable<{}> {
    console.log('email: ' + email + ', password: ' + password);
    const loginDataObservable = this.http.post<{}>(this.url + 'login', {email, password});
    console.log(loginDataObservable);
    return loginDataObservable;

  }

  getUserData(id: string, type: string): Observable<{}> {
    // console.log('email: ' + email + ', password: ' + password);
    const loginDataObservable = this.http.post<{}>(this.url + 'getuserdata', {id, type});
    console.log(loginDataObservable);
    return loginDataObservable;

  }

  getPatientDataViaEmail(email: string): Observable<Patient> {
    console.log('email: ' + email);
    const loginDataObservable = this.http.post<Patient>(this.url + 'refreshpatient', {email});
    console.log(loginDataObservable);
    return loginDataObservable;

  }

  refreshPatientData() {
    let parse: Patient = JSON.parse(localStorage.getItem('user'));
    let newPatientData: Patient;
    this.getPatientDataViaEmail(parse.email)
      .subscribe(
        (data: Patient) => {
          newPatientData = {...data};
          localStorage.setItem('user', JSON.stringify(newPatientData));
        }, // success path
        error => console.log(error)// error path
      );
  }
}
