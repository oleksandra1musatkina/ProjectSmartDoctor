import {Component, Input, OnInit} from '@angular/core';
import {Doctor} from '../login-page/login-page.service';
import {DoctorService, Ticket} from '../services/doctor.service';

@Component({
  selector: 'app-petient-waitingroom-info',
  templateUrl: './petient-waitingroom-info.component.html',
  styleUrls: ['./petient-waitingroom-info.component.css']
})
export class PetientWaitingroomInfoComponent implements OnInit {
  @Input() ticket: {};


  showModal: boolean;
  myDoctors: Doctor[] = [];
  myTickets: Ticket[] = [];
  myNumber: number = 0;
  minutes: number = 0;

  constructor(private doctorService: DoctorService) {
  }


  refreshDoctors() {
    this.doctorService.refreshUserData(this).subscribe((m: {}) => {
      if (m == this) {
        // this.patient = this.doctorService.getSavedPatient();
        this.getMyDoctors();

        // this.ngOnInit();
      }
    });
  }

  onClick() {
    this.getMyDoctors();

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
      error => console.log(JSON.stringify(error)) // error path
    );
    this.hide();
  }

  getMyDoctors() {
    this.doctorService.getDoctorsListObservable()
      .subscribe(
        (data: Doctor[]) => {
          this.myDoctors = [];
          let patient = this.doctorService.getSavedPatient();
          for (let d of data) {
            if (patient.doctors.includes(d._id)) {
              this.myDoctors.push(d);
            } else {
            }
          }
        }, // success path
        error => {
          console.log('doctor error: ' + error.toString());
        }// error path
      );
  }

  getMymumber() {
    if (this.ticket) {

      let patient = this.doctorService.getSavedPatient();
      let ticketElement: {}[] = this.ticket['patients'];
      for (let ticketElementElement of ticketElement) {
        if (ticketElementElement['patient'] == patient._id) {
          this.myNumber = ticketElementElement['number'];
          if (this.myNumber > this.ticket['lastnumber']) {
            let temp = this.myNumber - this.ticket['lastnumber'];
            temp *= this.ticket['estimatedpatienttime'];
            this.minutes = temp;
          }
        }
      }
    }
  }

  ngOnInit() {
    // this.getMyDoctors();
    this.getMymumber();
  }

}
