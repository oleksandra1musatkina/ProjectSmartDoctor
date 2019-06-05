import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from '../user';
import {Patient, LoginPageService, Doctor} from './login-page.service';
import {ActivatedRoute, Router, RouterStateSnapshot} from '@angular/router';
import {DoctorService} from '../services/doctor.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  private returnUrl: string;
  private loggedIn: boolean;

  // @Output() loginNotifier: EventEmitter<any> = new EventEmitter();

  constructor(private loginPageService: LoginPageService, private route: ActivatedRoute,
              private router: Router, private doctorService: DoctorService) {

  }


  patient: Patient;
  doctor: Doctor;
  error: any;
  model = new User(18, 'Dr IQ');

  register = false;

  onSubmit() {
    this.register = true;
  }

  newHero() {
    this.model = new User(42, '');
  }

  // TODO: Remove this when we're done
  get diagnostic() {
    return JSON.stringify(this.model);
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {

        this.returnUrl = params.returnUrl || '/';
      });

  }

  sendLoginRequest(username: string, password: string) {
    this.loginPageService.getLoginDataViaPost(username, password)
      .subscribe(
        (data: {}) => {
          console.log('som tu');
          console.log('som tu ' + data['type']);
          if (data['type'] == 'patient') {
            console.log('som tu2');

            this.patient = data['userdata'];
            console.log('login data: ' + JSON.stringify(this.patient));
            console.log('login data2: ' + data);

          } else {
            console.log('som tu3');

            this.doctor = data['userdata'];

          }

          localStorage.setItem('type', data['type']);
          console.log(JSON.stringify(data['userdata']));
          localStorage.setItem('user', JSON.stringify(data['userdata']));
          this.loginPageService.onLogin.emit(true);
          if (this.returnUrl == '/') {
            if (this.doctorService.isPatient()) {
              this.returnUrl = '/patient-home';
            } else {
              this.returnUrl = '/doctor-home';
            }
          }
          console.log('url: ' + this.returnUrl);
          this.router.navigateByUrl(this.returnUrl);


        }, // success path
        error => this.error = error// error path
      );

    console.log('login data: ' + this.patient);
    console.log('login error data: ' + this.error);

  }
}
