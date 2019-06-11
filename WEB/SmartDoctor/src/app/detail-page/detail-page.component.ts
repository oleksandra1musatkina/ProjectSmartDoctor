import {Component, OnInit} from '@angular/core';
import {Doctor, Patient} from '../login-page/login-page.service';
import {DataService} from '../services/data.service';
import {DoctorService} from '../services/doctor.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {

  patient: Patient;
  doctor: Doctor;
  isPatient: boolean = false;

  constructor(private dataService: DataService, private doctorService: DoctorService) {
  }

  ngOnInit() {
    this.isPatient = this.doctorService.isPatient();
    if (this.isPatient) {
      this.patient = this.doctorService.getSavedPatient();
      this.dataService.data.subscribe(message => this.doctor = message);

    } else {
      this.doctor = this.doctorService.getSavedDoctor();
      this.dataService.data.subscribe(message => this.patient = message);

    }
  }

}
