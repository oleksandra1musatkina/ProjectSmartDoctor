import {Component, Input, OnInit} from '@angular/core';
import {Doctor, Examination, LoginPageService, Patient} from '../login-page/login-page.service';
import {DoctorService} from '../services/doctor.service';
import {DataService} from '../services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-last-examinations',
  templateUrl: './last-examinations.component.html',
  styleUrls: ['./last-examinations.component.css']
})
export class LastExaminationsComponent implements OnInit {

  showModal: boolean;
  @Input() patient: Patient;
  @Input() doctorForExaminations: Doctor = null;
  isPatient: boolean = false;
  examinations;

  constructor(private doctorService: DoctorService, private dataService: DataService, private router: Router) {
  }

  ngOnInit() {

    console.log('last examination on init');
    this.isPatient = this.doctorService.isPatient();
    this.getLastExaminations();

    // this.examinations = this.getLastExaminations();
  }

  onClick(event) {
    this.showModal = true; // Show-Hide Modal Check
  }

  hide() {
    this.showModal = false;
  }

  openExaminationDetail(examination) {
    console.log('examination: ' + JSON.stringify(examination));
    let data = {examination: examination, patient: this.patient};
    this.dataService.setData(data);
    this.router.navigate(['examination-detail']);

  }

  getLastExaminations() {
    console.log('!!!patient: ' + JSON.stringify(this.patient));
    let examinations: Examination[] = this.patient.examintaions;
    // console.log('pocet vysetreni: ' + examinations.length);
    let lastExaminations: {}[] = [];


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
              if (date.getTime() < now.getTime()) {
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
