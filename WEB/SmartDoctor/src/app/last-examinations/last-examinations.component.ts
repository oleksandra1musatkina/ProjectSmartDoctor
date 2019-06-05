import {Component, OnInit} from '@angular/core';
import {Doctor, Examination, Patient} from '../login-page/login-page.service';
import {DoctorService} from '../services/doctor.service';

@Component({
  selector: 'app-last-examinations',
  templateUrl: './last-examinations.component.html',
  styleUrls: ['./last-examinations.component.css']
})
export class LastExaminationsComponent implements OnInit {

  showModal: boolean;
  patient: Patient;
  examinations;

  constructor(private doctorService: DoctorService) {
  }

  ngOnInit() {
    this.patient = JSON.parse(localStorage.getItem('user'));
    this.getLastExaminations();

    // this.examinations = this.getLastExaminations();
  }

  onClick(event) {
    this.showModal = true; // Show-Hide Modal Check
  }

  //Bootstrap Modal Close event
  hide() {
    this.showModal = false;
  }


  getLastExaminations() {
    this.doctorService.getDoctorsListObservable()
      .subscribe(
        (data: Doctor[]) => {
          let doctors = data;
          let examinations: Examination[] = this.doctorService.getExaminations();
          let lastExaminations: Examination[] = [];
          for (let examination of examinations) {
            let date = new Date(examination.date);
            let now = new Date();
            if (date.getTime() < now.getTime()) {
              lastExaminations.push(examination);
              console.log('patients: ' + doctors);
              for (let doctor of doctors) {
                console.log('did: ' + doctor._id + '; did2: ' + examination.doctor);
                if (doctor._id == examination.doctor) {
                  examination['doctordata'] = doctor;
                }
              }

            }
          }
          this.examinations = lastExaminations;

          // let doctors1 = this.doctor.patients;
          // for (let d of data) {
          //   if (this.doctor.patients.includes(d._id)) {
          //     this.myPatients.push(d);
          //   }
          //
          // }
        }, // success path
        error => {
          console.log('error: ' + error.toString());
        }// error path
      );
  }

}
