import {Component, OnInit} from '@angular/core';
import {Doctor} from '../login-page/login-page.service';
import {DoctorService, Insurance} from '../services/doctor.service';

@Component({
  selector: 'app-petient-insurence',
  templateUrl: './petient-insurence.component.html',
  styleUrls: ['./petient-insurence.component.css']
})
export class PetientInsurenceComponent implements OnInit {

  showModal: boolean;
  insurances: Insurance[] = [];
  insurance: Insurance = null;

  constructor(private doctorService: DoctorService) {
  }

  onClick() {
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
  }

  setInsurance(id) {
    this.doctorService.setPatientInsuranceObservable(id).subscribe(
      (data: string) => {
        console.log(data);
        this.doctorService.refreshUserData(this).subscribe((m: {}) => {
          if (m == this) {
            // callback();
            // items= items.slice();
            // this.patients=this.patients.slice();
            this.getPatientInsurance();
          }
        });
      },
      error => console.log(JSON.stringify(error))
    );
    this.hide();
  }

  getInsurances() {
    this.doctorService.getInsurancesListObservable()
      .subscribe(
        (data: Insurance[]) => {
          this.insurances = data;
        },
        error => console.log(JSON.stringify(error))
      );
  }

  getPatientInsurance() {
    this.doctorService.getInsuranceObservable(this.doctorService.getSavedPatient().insuranceNumber).subscribe(
      (data: Insurance) => {
        this.insurance = data;
      },
      error => console.log(JSON.stringify(error))
    );
  }

  ngOnInit(): void {
    this.getInsurances();
    this.getPatientInsurance();
  }

}
