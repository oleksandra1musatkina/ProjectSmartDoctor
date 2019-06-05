import {Component, OnInit} from '@angular/core';
import {Doctor, LoginPageService, Patient} from '../login-page/login-page.service';
import {DoctorService} from '../services/doctor.service';

@Component({
  selector: 'app-my-patient-page',
  templateUrl: './my-patient-page.component.html',
  styleUrls: ['./my-patient-page.component.css']
})
export class MyPatientPageComponent implements OnInit {
  showModal: boolean;

  // patients: Patient[];
  notMyPatients: Patient[] = [];
  error: any;
  myPatients: Patient[] = [];
  doctor: Doctor;


  constructor(private doctorService: DoctorService) {
    this.doctorService.messaging.subscribe({
      next: (event: string) => {
        if (event == 'patient-remove')
          this.refreshPatients();
      }
    });
  };

  getNotMyPatients() {
    this.doctorService.getPatientsListObservable()
      .subscribe(
        (data: Patient[]) => {
          this.notMyPatients = [];

          for (let d of data) {
            if (!this.doctor.patients.includes(d._id)) {
              this.notMyPatients.push(d);
            }
          }
          console.log('not my patients: ' + JSON.stringify(this.notMyPatients));
          console.log('not my patients: ' + JSON.stringify(this.doctor));


        }, // success path
        error => {
          console.log('doctor error: ' + error.toString());
          this.error = error;
        }// error path
      );
  }

  refreshPatients() {
    this.doctorService.refreshUserData(this).subscribe((m: {}) => {
      if (m == this) {
        // callback();
        // items= items.slice();
        // this.patients=this.patients.slice();
        this.doctor = this.doctorService.getSavedDoctor();
        this.getMyPatients();

        // this.ngOnInit();
      }
    });
  }

  onClick(event) {
    this.getNotMyPatients();

    this.showModal = true; // Show-Hide Modal Check
  }

  //Bootstrap Modal Close event
  hide() {
    this.showModal = false;
  }

  addPatient(id) {
    console.log('idcko: ' + id);
    this.doctorService.addPatientToDoctor(id).subscribe(
      (data: string) => {
        this.refreshPatients();
        // this.loginPageService.refreshPatientData();
      },

      error => {
        this.error = error;
        console.log(JSON.stringify(error));
      } // error path
    );
    this.hide();
  }

  getMyPatients() {
    this.doctorService.getPatientsListObservable()
      .subscribe(
        (data: Patient[]) => {
          this.myPatients = [];

          for (let d of data) {
            if (this.doctor.patients.includes(d._id)) {
              this.myPatients.push(d);
            } else {
            }
          }
          console.log('my patients: ' + this.myPatients);
          console.log('my patients: ' + JSON.stringify(this.doctor));


        }, // success path
        error => {
          console.log('doctor error: ' + error.toString());
          this.error = error;
        }// error path
      );
  }

  ngOnInit() {
    this.doctor = this.doctorService.getSavedDoctor();

    this.getMyPatients();
  }

}
