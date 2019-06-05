import {AfterContentInit, AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Doctor, LoginPageService, Patient} from './login-page/login-page.service';
import {DoctorService} from './services/doctor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'SmartDoctor';
  patient: Patient = null;
  doctor: Doctor = null;

  isPatient: boolean = false;

  // type: string;

  constructor(private router: Router, private loginPageService: LoginPageService, private doctorService: DoctorService, private elementRef: ElementRef) {

    this.loginPageService.onLogin.subscribe({
      next: (event: boolean) => {
        if (event == true)
          if (this.doctorService.isPatient()) {
            this.isPatient = true;
            this.patient = this.doctorService.getSavedPatient();
          } else {
            this.doctor = this.doctorService.getSavedDoctor();
          }
      }
    });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('type');
    this.router.navigate(['/login']);

  }

  ngOnInit(): void {
    // console.log('type:   ' + localStorage.getItem('type'));
    // this.type = localStorage.getItem('type');
    // console.log('type v app: ' + this.type);
    if (localStorage.getItem('user')) {
      if (this.doctorService.isPatient()) {
        this.patient = this.doctorService.getSavedPatient();
      } else {
        this.doctor = this.doctorService.getSavedDoctor();
      }
      // if (this.type == 'doctor') {
      //   this.doctor = JSON.parse(localStorage.getItem('user'));
      // } else {
      //   this.doctor = JSON.parse(localStorage.getItem('user'));
      // }
    }
    console.log('toto je doctor: ' + JSON.stringify(this.doctor));
    console.log('toto je doctor: ' + this.patient);
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#d9dd92';
  }
}
