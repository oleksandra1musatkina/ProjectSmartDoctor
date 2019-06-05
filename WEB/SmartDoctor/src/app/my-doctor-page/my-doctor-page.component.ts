import {Component, Input, OnInit} from '@angular/core';
import {Doctor, LoginPageService, Patient} from '../login-page/login-page.service';
import {DoctorService} from '../services/doctor.service';

@Component({
  selector: 'app-my-doctor-page',
  templateUrl: './my-doctor-page.component.html',
  styleUrls: ['./my-doctor-page.component.css']
})
export class MyDoctorPageComponent implements OnInit {
  showModal: boolean;

  notMyDoctors: Doctor[] = [];
  error: any;
  myDoctors: Doctor[] = [];
  patient: Patient;


  constructor(private doctorService: DoctorService, private loginPageService: LoginPageService) {
    this.doctorService.messaging.subscribe({
      next: (event: string) => {
        if (event == 'doctor-remove')
          this.refreshDoctors();
      }
    });
  };

  getNotMyDoctors() {
    this.doctorService.getDoctorsListObservable()
      .subscribe(
        (data: Doctor[]) => {
          this.notMyDoctors = [];

          for (let d of data) {
            if (!this.patient.doctors.includes(d._id)) {
              this.notMyDoctors.push(d);
            } else {
            }
          }


        }, // success path
        error => {
          console.log('doctor error: ' + error.toString());
          this.error = error;
        }// error path
      );
  }

  refreshDoctors() {
    this.doctorService.refreshUserData(this).subscribe((m: {}) => {
      if (m == this) {
        // callback();
        // items= items.slice();
        // this.patients=this.patients.slice();
        this.patient = this.doctorService.getSavedPatient();
        this.getMyDoctors();

        // this.ngOnInit();
      }
    });
  }

  onClick(event) {
    this.getNotMyDoctors();

    this.showModal = true; // Show-Hide Modal Check
  }

  //Bootstrap Modal Close event
  hide() {
    this.showModal = false;
  }

  addDoctor(id) {
    console.log('idcko: ' + id);
    this.doctorService.addDoctorToPatient(id).subscribe(
      (data: string) => {
        console.log(data);
        this.refreshDoctors();
        // this.loginPageService.refreshPatientData();
      },
      error => this.error = error // error path
    );
    this.hide();
  }

  getMyDoctors() {
    this.doctorService.getDoctorsListObservable()
      .subscribe(
        (data: Doctor[]) => {
          this.myDoctors = [];

          let doctors1 = this.patient.doctors;
          for (let d of data) {
            if (this.patient.doctors.includes(d._id)) {
              this.myDoctors.push(d);
            } else {
            }
          }
          console.log('my patients: ' + this.myDoctors);
          console.log('my patients: ' + JSON.stringify(this.patient));


        }, // success path
        error => {
          console.log('doctor error: ' + error.toString());
          this.error = error;
        }// error path
      );
  }

  ngOnInit() {
    this.patient = this.doctorService.getSavedPatient();

    this.getMyDoctors();
  }

}
