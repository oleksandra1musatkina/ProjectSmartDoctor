import {Component, Input, OnInit} from '@angular/core';
import {Doctor, Examination, Patient} from '../login-page/login-page.service';
import {DoctorService} from '../services/doctor.service';

@Component({
  selector: 'app-pending-examinations',
  templateUrl: './pending-examinations.component.html',
  styleUrls: ['./pending-examinations.component.css']
})
export class PendingExaminationsComponent implements OnInit {
  showModal: boolean;
  @Input() patient: Patient;
  @Input() doctorForExaminations: Doctor = null;
  isPatient: boolean = false;
  examinations;

  constructor(private doctorService: DoctorService) {
    this.isPatient = this.doctorService.isPatient();

  }

  ngOnInit() {
    this.getPendingExaminations();

  }

  onClick(event) {
    this.showModal = true; // Show-Hide Modal Check
  }

  //Bootstrap Modal Close event
  hide() {
    this.showModal = false;
  }

  getPendingExaminations() {
    let examinations: Examination[] = this.patient.examintaions;
    if (this.patient.examintaions) {
      examinations = this.patient.examintaions;
    } else {
      examinations = [];
    }

    // console.log('pocet vysetreni: ' + examinations.length);
    let lastExaminations: Examination[] = [];


    if (this.doctorForExaminations) {
      // console.log('je zadany doktor');

      for (let examination of examinations) {
        let date = new Date(examination.date);
        let now = new Date();
        if (date.getTime() < now.getTime()) {
          // console.log('doktor vysetrenia: ' + examination.doctor);
          // console.log('ma byt doktor: ' + this.doctorForExaminations._id);
          if (examination.doctor == this.doctorForExaminations._id) {
            examination['doctordata'] = this.doctorForExaminations;

            lastExaminations.push(examination);
          }
        }
      }
    } else {
      // console.log('nie je zadany doktor');
      this.doctorService.getDoctorsListObservable()
        .subscribe(
          (data: Doctor[]) => {
            let doctors = data;
            for (let examination of examinations) {
              let date = new Date(examination.date);
              let now = new Date();
              if (date.getTime() >= now.getTime()) {
                lastExaminations.push(examination);
                // console.log('patients: ' + doctors);
                for (let doctor of doctors) {
                  // console.log('did: ' + doctor._id + '; did2: ' + examination.doctor);
                  if (doctor._id == examination.doctor) {
                    examination['doctordata'] = doctor;
                  }
                }

              }
            }

          },
          error => {
            console.log('error: ' + error.toString());
          }// error path
        );
    }
    this.examinations = lastExaminations;

  }

}
