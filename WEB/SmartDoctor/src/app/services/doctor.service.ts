import {EventEmitter, Injectable} from '@angular/core';
import {Doctor, Examination, LoginPageService, Patient} from '../login-page/login-page.service';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';


export interface DisplayandsetData {
  data: string;
}

export interface Insurance {
  _id: string;
  name: string;
  imageref: string;
}

export interface NotificationItem {
  _id: string;
  type: string;
  from: string;
  fromtype: string;
  to: string;
  totype: string;
  heading: string;
  message: string;
  dateadded: Date;
  eventtype: string;
  eventdate: Date;
}

export interface Ticket {
  _id: string;
  doctor: string;
  status: string;
  estimatedpatienttime: string;
  lastnumber: string;
  maxpatients: string;
  patients: string[];
  lastentertime: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  url = 'http://localhost:3330/';
  doctors: Doctor[];
  error: any;
  patient: Patient;
  private refreshDataListeners = new Subject<any>();
  public messaging: EventEmitter<string> = new EventEmitter<string>();

  sendMessage(message: string) {

    this.messaging.emit(message);

  }

  refreshUserData(identifier: {}): Observable<any> {
    let type = this.getType();
    let user;
    if (this.isPatient()) {
      user = this.getSavedPatient();
    } else {
      user = this.getSavedDoctor();
    }
    // let newUserData: {};
    this.loginPageService.getUserData(user._id, type)
      .subscribe(
        (data: {}) => {
          // if (data['type'] == 'doctor') {
          //   console.log('som tu2');
          //
          //   user = data['userdata'];
          //   // console.log('login data: ' + JSON.stringify(this.doctor));
          //   // console.log('login data2: ' + data);
          //
          // } else {
          //   console.log('som tu3');
          //
          //   user = data['userdata'];
          //
          // }

          localStorage.setItem('type', data['type']);
          console.log(JSON.stringify(data['userdata']));
          localStorage.setItem('user', JSON.stringify(data['userdata']));
          this.loginPageService.onLogin.emit(true);
          console.log('callback: ' + identifier);
          if (identifier) {
            this.notifyWaiters(identifier);
          }
        }, // success path
        error => console.log(error)// error path
      );
    return this.refreshDataListeners.asObservable();
  }

  notifyWaiters(filterBy: {}) {
    this.refreshDataListeners.next(filterBy);
  }

  constructor(private http: HttpClient, private loginPageService: LoginPageService) {
  }

  getInsurancesListObservable(): Observable<Insurance[]> {

    const insurancesObservable = this.http.post<Insurance[]>(this.url + 'insurances', {});
    return insurancesObservable;

  }

  getInsuranceObservable(insuranceid: string): Observable<Insurance> {

    const insuranceObservable = this.http.post<Insurance>(this.url + 'insurance', {insuranceid});
    return insuranceObservable;

  }

  setPatientInsuranceObservable(insuranceid: string): Observable<string> {
    let patient: Patient = JSON.parse(localStorage.getItem('user'));

    const setPatientInsuranceObservable = this.http.post<string>(this.url + 'setpatientinsurance', {
      patientid: patient._id,
      insuranceid: insuranceid
    });
    return setPatientInsuranceObservable;

  }

  getDoctorsListObservable(): Observable<Doctor[]> {
    this.patient = JSON.parse(localStorage.getItem('user'));

    // console.log('email: ' + email + ', password: ' + password);
    const doctorsObservable = this.http.post<Doctor[]>(this.url + 'doctors', {email: this.patient.email, password: this.patient.password});
    console.log(doctorsObservable);
    return doctorsObservable;

  }

  getPatientsListObservable(): Observable<Patient[]> {
    this.patient = JSON.parse(localStorage.getItem('user'));

    // console.log('email: ' + email + ', password: ' + password);
    const patientsObservable = this.http.post<Patient[]>(this.url + 'patients', {
      email: this.patient.email,
      password: this.patient.password
    });
    console.log(patientsObservable);
    return patientsObservable;

  }

  addDoctorToPatient(doctorId: string): Observable<string> {
    this.patient = JSON.parse(localStorage.getItem('user'));

    // this.toSend = JSON.parse(JSON.stringify(user));
    // this.toSend[key] = data;
    return this.http.post<string>(this.url + 'adddoctor', {
      email: this.patient.email,
      password: this.patient.password,
      patient: this.patient._id,
      doctor: doctorId
    });
  }

  addPatientToDoctor(patientId: string): Observable<string> {
    let doctor = this.getSavedDoctor();

    return this.http.post<string>(this.url + 'addpatient', {
      email: doctor.email,
      password: doctor.password,
      patient: patientId,
      doctor: doctor._id
    });
  }

  removeDoctorFromPatient(doctorId: string): Observable<string> {
    this.patient = JSON.parse(localStorage.getItem('user'));

    // this.toSend = JSON.parse(JSON.stringify(user));
    // this.toSend[key] = data;
    return this.http.post<string>(this.url + 'removedoctor', {
      email: this.patient.email,
      password: this.patient.password,
      patient: this.patient._id,
      doctor: doctorId
    });
  }

  removePatientFromDoctor(patientId: string): Observable<string> {
    let doctor = this.getSavedDoctor();
    // this.toSend = JSON.parse(JSON.stringify(user));
    // this.toSend[key] = data;
    return this.http.post<string>(this.url + 'removepatient', {
      email: doctor.email,
      password: doctor.password,
      patient: patientId,
      doctor: doctor._id
    });
  }

  addDrugTimeObservable(drugname: string, time: string): Observable<string> {
    let patient = this.getSavedPatient();
    // this.toSend = JSON.parse(JSON.stringify(user));
    // this.toSend[key] = data;
    return this.http.post<string>(this.url + 'adddrugtime', {
      email: patient.email,
      password: patient.password,
      patient: patient._id,
      drugname: drugname,
      time: time
    });
  }

  addNewDrugObservable(drugname: string): Observable<string> {
    let patient = this.getSavedPatient();
    return this.http.post<string>(this.url + 'adddrug', {
      email: patient.email,
      password: patient.password,
      patient: patient._id,
      drugname: drugname,
    });
  }

  removeDrugObservable(drugname: string): Observable<string> {
    let patient = this.getSavedPatient();
    return this.http.post<string>(this.url + 'removedrug', {
      email: patient.email,
      password: patient.password,
      patient: patient._id,
      drugname: drugname,
    });
  }

  getNotMyDoctors() {

    this.getDoctorsListObservable()
      .subscribe(
        (data: Doctor[]) => {
          this.doctors = {...data};
          // console.log('login data: ' + JSON.stringify(this.doctor));
          // console.log('login data2: ' + data);
          // this.loginPageService.onLogin.emit(data);

          // localStorage.setItem('user', JSON.stringify(this.doctor));
          // this.router.navigateByUrl(this.returnUrl);
        }, // success path
        error => this.error = error// error path
      );
  }

  getSavedDoctor(): Doctor {
    let parse: Doctor = JSON.parse(localStorage.getItem('user'));
    return parse;
  }

  getSavedPatient(): Patient {
    let parse: Patient = JSON.parse(localStorage.getItem('user'));
    return parse;
  }

  getType(): string {
    let parse: string = localStorage.getItem('type');
    return parse;
  }

  getExaminations(): Examination[] {
    let patient: Patient = JSON.parse(localStorage.getItem('user'));

    return patient.examintaions;
    // this.toSend = JSON.parse(JSON.stringify(user));
    // this.toSend[key] = data;
  }

  isPatient(): boolean {
    let type = this.getType();
    if (type == 'patient') {
      return true;
    }
    return false;

  }

  saveData(key: string, data: string): Observable<string> {

    let user;
    if (this.isPatient()) {
      user = this.getSavedPatient();
    } else {
      user = this.getSavedDoctor();
    }
    // this.toSend = JSON.parse(JSON.stringify(user));
    // this.toSend[key] = data;
    return this.http.post<string>(this.url + 'savedata', {
      id: user._id,
      type: this.getType(),
      key: key,
      value: data
    });
  }

  refreshUserData_old(callback: Function = null) {
    let type = this.getType();
    let user;
    if (this.isPatient()) {
      user = this.getSavedPatient();
    } else {
      user = this.getSavedDoctor();
    }
    // let newUserData: {};
    this.loginPageService.getUserData(user._id, type)
      .subscribe(
        (data: {}) => {
          // if (data['type'] == 'doctor') {
          //   console.log('som tu2');
          //
          //   user = data['userdata'];
          //   // console.log('login data: ' + JSON.stringify(this.doctor));
          //   // console.log('login data2: ' + data);
          //
          // } else {
          //   console.log('som tu3');
          //
          //   user = data['userdata'];
          //
          // }

          localStorage.setItem('type', data['type']);
          console.log(JSON.stringify(data['userdata']));
          localStorage.setItem('user', JSON.stringify(data['userdata']));
          this.loginPageService.onLogin.emit(true);
          console.log('calback: ' + callback);
          if (callback) {
            this.notifyWaiters(callback);
          }
        }, // success path
        error => console.log(error)// error path
      );
  }

  getUserNotificationObservable(): Observable<NotificationItem[]> {
    let type = this.getType();
    let user;
    if (this.isPatient()) {
      user = this.getSavedPatient();
    } else {
      user = this.getSavedDoctor();
    }
    const notificationsObservable = this.http.post<NotificationItem[]>(this.url + 'getusernotifications', {
      userid: user._id,
      usertype: type
    });
    return notificationsObservable;
  }

  deleteNotificationObservable(notificationId: string): Observable<string> {
    const notificationsObservable = this.http.post<string>(this.url + 'deletenotification', {notificationid: notificationId});
    return notificationsObservable;
  }

  addNotificationObservable(notification: {}): Observable<string> {
    const notificationsObservable = this.http.post<string>(this.url + 'addnotification', {notification: notification});
    return notificationsObservable;
  }

  addExaminationObservable(patientid: string, examination: {}): Observable<string> {
    const examinationObservable = this.http.post<string>(this.url + 'addexamination', {patient: patientid, examination: examination});
    return examinationObservable;
  }

  getDoctorTicketObservable(doctoid: string, estimatedpatienttime: string, maxpatients: string): Observable<Ticket> {
    const ticketObservable = this.http.post<Ticket>(this.url + 'doctorticket', {
      doctor: doctoid,
      estimatedpatienttime: estimatedpatienttime,
      maxpatients: maxpatients
    });
    return ticketObservable;
  }

  openDoctorTicketSystemObservable(doctoid: string, estimatedpatienttime: string, maxpatients: string): Observable<Ticket> {
    const ticketObservable = this.http.post<Ticket>(this.url + 'opendoctorticket', {
      doctor: doctoid,
      estimatedpatienttime: estimatedpatienttime,
      maxpatients: maxpatients
    });
    return ticketObservable;
  }

  closeDoctorTicketSystemObservable(doctoid: string, estimatedpatienttime: string, maxpatients: string): Observable<Ticket> {
    const ticketObservable = this.http.post<Ticket>(this.url + 'closedoctorticket', {
      doctor: doctoid,
      estimatedpatienttime: estimatedpatienttime,
      maxpatients: maxpatients
    });
    return ticketObservable;
  }

  callNextDoctorTicketSystemObservable(doctoid: string, lastnumber: string): Observable<string> {
    const ticketObservable = this.http.post<string>(this.url + 'callnextdoctorticket', {
      doctor: doctoid,
      lastnumber: lastnumber,
    });
    return ticketObservable;
  }

  getDoctorTicketsFromDoctorListObservable(doctors: string[]): Observable<Ticket[]> {
    const ticketObservable = this.http.post<Ticket[]>(this.url + 'getmydoctorstickets', {
      doctors: doctors,
    });
    return ticketObservable;
  }

  requestTicketObservable(doctor: string): Observable<string> {
    let patient: Patient = this.getSavedPatient();
    const ticketObservable = this.http.post<string>(this.url + 'requestticket', {
      doctor: doctor,
      patient: patient._id
    });
    return ticketObservable;
  }

  requestPatientTicketsObservable(): Observable<Ticket[]> {
    let patient: Patient = this.getSavedPatient();
    const ticketObservable = this.http.post<Ticket[]>(this.url + 'getpatienttickets', {
      patient: patient._id
    });
    return ticketObservable;
  }

  addDoctorRationgObservable(doctorId: string, ratingNumber: number): Observable<string> {
    let patient: Patient = this.getSavedPatient();
    const ticketObservable = this.http.post<string>(this.url + 'adddoctorrating', {
      email: patient.email,
      password: patient.password,
      doctor: doctorId,
      rating: {patient: patient._id, rate: ratingNumber}
    });
    return ticketObservable;
  }

  createNotification(oldNotification: {}, status: string) {
    let newNotification = {};
    newNotification['type'] = 'info';
    newNotification['from'] = oldNotification['to'];
    newNotification['fromtype'] = oldNotification['totype'];
    newNotification['to'] = oldNotification['from'];
    // console.log('problemmmm: ' + oldNotification['fromtype']);
    newNotification['totype'] = oldNotification['fromtype'];
    newNotification['heading'] = oldNotification['heading'] + ' - was ' + status;
    newNotification['message'] = 'Your request: \'' + oldNotification['message'] + '\' was ' + status;
    newNotification['dateadded'] = new Date;
    newNotification['eventtype'] = null;
    newNotification['eventdate'] = null;

    return newNotification;
  }

}
