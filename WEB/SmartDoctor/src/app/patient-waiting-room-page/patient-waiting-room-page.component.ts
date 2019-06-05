import {Component, OnInit} from '@angular/core';
import {Doctor} from '../login-page/login-page.service';
import {DoctorService, Ticket} from '../services/doctor.service';

@Component({
  selector: 'app-patient-waiting-room-page',
  templateUrl: './patient-waiting-room-page.component.html',
  styleUrls: ['./patient-waiting-room-page.component.css']
})
export class PatientWaitingRoomPageComponent implements OnInit {


  showModal: boolean;
  // myDoctors: Doctor[] = [];
  // myTickets: Ticket[] = [];
  myTickets: {}[] = [];
  myDoctorsTickets: {}[] = [];

  error: {} = null;

  // myDoctorsTickets: Ticket[] = [];

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

  requestTicket(id) {
    console.log('idcko: ' + id);
    this.error = null;
    this.doctorService.requestTicketObservable(id).subscribe(
      (data: string) => {
        console.log(data);
        this.refreshDoctors();
        // this.loginPageService.refreshPatientData();
      },
      error => {
        console.log(JSON.stringify(error));
        this.error = error.error;
      } // error path
    );
    if (this.error != null) {
      this.hide();
    }
  }

  getMyDoctors() {
    this.doctorService.getDoctorsListObservable()
      .subscribe(
        (data: Doctor[]) => {
          let myDoctors = [];
          let patient = this.doctorService.getSavedPatient();
          for (let d of data) {
            if (patient.doctors.includes(d._id)) {
              myDoctors.push(d);


            }
          }
          let doctorsIdsList = [];
          for (let myDoctor of myDoctors) {
            doctorsIdsList.push(myDoctor._id);
          }
          this.doctorService.getDoctorTicketsFromDoctorListObservable(doctorsIdsList)
            .subscribe(
              (data: Ticket[]) => {
                this.myDoctorsTickets = [];
                let patient = this.doctorService.getSavedPatient();
                for (let d of data) {
                  for (let myDoctor of myDoctors) {
                    if (d.doctor == myDoctor._id) {
                      let temp = {};
                      temp = d;
                      temp['doctordata'] = myDoctor;
                      this.myDoctorsTickets.push(temp);
                    }
                  }
                }
              }, // success path
              error => {
                console.log('doctor error: ' + error.toString());
              }// error path
            );
        }, // success path
        error => {
          console.log('doctor error: ' + error.toString());
        }// error path
      );
  }

  getMyTickets() {
    this.doctorService.getDoctorsListObservable()
      .subscribe(
        (data: Doctor[]) => {
          let doctors = data;
          this.doctorService.requestPatientTicketsObservable().subscribe(
            (data: Ticket[]) => {
              console.log(JSON.stringify(data));
              let tickets = data;

              for (let doctor of doctors) {
                for (let ticket of tickets) {
                  if (ticket.doctor == doctor._id) {
                    let temp = {};
                    temp = ticket;
                    temp['doctordata'] = doctor;
                    this.myTickets.push(temp);

                  }
                }

              }

              // this.loginPageService.refreshPatientData();
            },
            error => {
              console.log(JSON.stringify(error));
              this.error = error.error;
            } // error path
          );
        }, // success path
        error => {
          console.log('doctor error: ' + error.toString());
        }// error path
      );


    if (this.error != null) {
      this.hide();
    }
  }

  ngOnInit() {
    this.getMyDoctors();
    console.log('get my tickets: ---------------------------------------');
    this.getMyTickets();
  }
}
