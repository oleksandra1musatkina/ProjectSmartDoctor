import {Component, OnInit} from '@angular/core';
import {Doctor} from '../login-page/login-page.service';
import {DoctorService, Ticket} from '../services/doctor.service';

@Component({
  selector: 'app-doctor-waiting-room-page',
  templateUrl: './doctor-waiting-room-page.component.html',
  styleUrls: ['./doctor-waiting-room-page.component.css']
})
export class DoctorWaitingRoomPageComponent implements OnInit {


  showModal: boolean;
  ticket: Ticket;
  callNextError: string;
  myTickets: Ticket[] = [];

  constructor(private doctorService: DoctorService) {
  }


  refreshDoctors() {
    this.doctorService.refreshUserData(this).subscribe((m: {}) => {
      if (m == this) {
        // this.patient = this.doctorService.getSavedPatient();
        // this.getMyDoctors();

        // this.ngOnInit();
      }
    });
  }

  onClick() {
    // this.getMyDoctors();

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

  getMyTicket() {
    this.ticket = null;
    let doctor = this.doctorService.getSavedDoctor();
    this.doctorService.getDoctorTicketObservable(doctor._id, doctor.estimatedpatienttime, doctor.maxpatients)
      .subscribe(
        (data: Ticket) => {
          this.ticket = data;
        }, // success path
        error => {
          console.log('doctor error: ' + error.toString());
        }// error path
      );
  }

  openTicketSystem() {
    this.callNextError = null;
    let doctor = this.doctorService.getSavedDoctor();
    this.doctorService.openDoctorTicketSystemObservable(doctor._id, doctor.estimatedpatienttime, doctor.maxpatients)
      .subscribe(
        (data: Ticket) => {
          this.ticket = data;
        }, // success path
        error => {
          console.log('doctor error: ' + JSON.stringify(error));
        }// error path
      );
    this.getMyTicket();
  }

  closeTicketSystem() {
    let doctor = this.doctorService.getSavedDoctor();
    this.doctorService.closeDoctorTicketSystemObservable(doctor._id, doctor.estimatedpatienttime, doctor.maxpatients)
      .subscribe(
        (data: Ticket) => {
          this.ticket = data;
        }, // success path
        error => {
          console.log('doctor error: ' + JSON.stringify(error));
        }// error path
      );
    this.getMyTicket();
  }

  callNextTicketSystem() {
    this.ticket = null;
    let doctor = this.doctorService.getSavedDoctor();
    this.doctorService.getDoctorTicketObservable(doctor._id, doctor.estimatedpatienttime, doctor.maxpatients)
      .subscribe(
        (data: Ticket) => {
          this.ticket = data;
          if (Number(this.ticket.patients.length) - Number(this.ticket.lastnumber) > 0) {
            this.doctorService.callNextDoctorTicketSystemObservable(doctor._id, this.ticket.lastnumber + 1)
              .subscribe(
                (data: string) => {
                  console.log(data);
                }, // success path
                error => {
                  console.log('doctor error: ' + JSON.stringify(error));
                }// error path
              );
          } else {
            this.callNextError = 'There is no one to be called!';
          }
        }, // success path
        error => {
          console.log('doctor error: ' + error.toString());
        }// error path
      );


    this.getMyTicket();
  }

  ngOnInit() {
    this.getMyTicket();
  }
}
