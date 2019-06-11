import {Component, Input, OnInit} from '@angular/core';
import {Doctor, LoginPageService, Patient} from '../login-page/login-page.service';
import {DoctorService} from '../services/doctor.service';
import {DataService} from '../services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  @Input() patient: Patient;
  @Input() eventtype: string;
  @Input() message: string;
  @Input() date: Date;
  @Input() showDetails: boolean = false;

  showModal: boolean;
  showAddRequestModal: boolean;


  score: number = 0;
  numberOfRatins: number = 0;
  fiveStars: number = 0;
  fourStars: number = 0;
  threeStars: number = 0;
  twoStars: number = 0;
  oneStars: number = 0;
  fiveStarsPercentage: number = 0;
  fourStarsPercentage: number = 0;
  threeStarsPercentage: number = 0;
  twoStarsPercentage: number = 0;
  oneStarsPercentage: number = 0;
  points: number = 0;


  constructor(private doctorService: DoctorService, private loginPageService: LoginPageService, private dataService: DataService, private router: Router) {
  };

  navigateToDetail() {
    this.dataService.setData(this.patient);
    this.router.navigate(['detail']);
  }

  ngOnInit() {
    let rating = this.patient.rating;
    if (rating) {
      rating.forEach(r => {
        let number = Number(r['rate']);
        this.points += number;
        switch (number) {
          case 1: {
            this.oneStars += 1;
            this.numberOfRatins += 1;
            break;
          }
          case 2: {
            this.twoStars += 1;
            this.numberOfRatins += 1;
            break;
          }
          case 3: {
            this.threeStars += 1;
            this.numberOfRatins += 1;
            break;
          }
          case 4: {
            this.fourStars += 1;
            this.numberOfRatins += 1;
            break;
          }
          case 5: {
            this.fiveStars += 1;
            this.numberOfRatins += 1;
            break;
          }
        }
      });
      let p = this.numberOfRatins / 100;
      this.oneStarsPercentage = this.oneStars / p;
      this.twoStarsPercentage = this.twoStars / p;
      this.threeStarsPercentage = this.threeStars / p;
      this.fourStarsPercentage = this.fourStars / p;
      this.fiveStarsPercentage = this.fiveStars / p;
      if (this.numberOfRatins > 0) {
        this.score = this.points / this.numberOfRatins;
      }
    }
  }

  onClick(event) {
    // this.getNotMyPatients();

    this.showModal = true; // Show-Hide Modal Check
  }

  //Bootstrap Modal Close event
  hide() {
    this.showModal = false;
  }

  confirmPatientRemoval(patientId) {
    this.doctorService.removePatientFromDoctor(patientId).subscribe(
      (data: string) => {
        console.log(data);
        this.doctorService.sendMessage('patient-remove');
      }, // success path
      error => console.log(error) // error path
    );
    this.hide();
  }

  onAddRequestClick() {
    // this.getNotMyPatients();
    this.eventtype = '';
    this.date = null;
    this.message = '';

    this.showAddRequestModal = true; // Show-Hide Modal Check
  }

  //Bootstrap Modal Close event
  hideAddRquest() {
    this.showAddRequestModal = false;
  }

  confirmAddRequest(doctorId) {
    let newNotification = {};
    newNotification['type'] = 'request';
    newNotification['from'] = this.doctorService.getSavedPatient()._id;
    newNotification['fromtype'] = 'doctor';
    newNotification['to'] = doctorId;
    newNotification['totype'] = 'patient';
    newNotification['heading'] = this.eventtype;
    newNotification['message'] = this.message;
    newNotification['dateadded'] = new Date;
    newNotification['eventtype'] = this.eventtype;
    newNotification['eventdate'] = this.date;
    this.doctorService.addNotificationObservable(newNotification).subscribe(
      (data: string) => {
        console.log(data);
      }, // success path
      error => console.log(error) // error path
    );
    this.hideAddRquest();

  }
}
