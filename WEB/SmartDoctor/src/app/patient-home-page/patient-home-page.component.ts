import {Component, OnInit} from '@angular/core';
import {Patient} from '../login-page/login-page.service';
import {DoctorService} from '../services/doctor.service';

@Component({
  selector: 'app-patient-home-page',
  templateUrl: './patient-home-page.component.html',
  styleUrls: ['./patient-home-page.component.css']
})
export class PatientHomePageComponent implements OnInit {

  patient: Patient;

  constructor(private doctorService: DoctorService) {
  }

  ngOnInit() {
    this.patient = this.doctorService.getSavedPatient();
  }

}
