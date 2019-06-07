import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../user';
import {Patient, LoginPageService, Doctor} from './login-page.service';
import {ActivatedRoute, Router, RouterStateSnapshot} from '@angular/router';
import {DoctorService} from '../services/doctor.service';
import {trigger, state, style, transition, animate} from '@angular/animations';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class LoginPageComponent implements OnInit {

  private returnUrl: string;
  private loggedIn: boolean;


  // @Output() loginNotifier: EventEmitter<any> = new EventEmitter();

  constructor(private loginPageService: LoginPageService, private route: ActivatedRoute,
              private router: Router, private doctorService: DoctorService) {

  }

  flip: string = 'inactive';

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }


  patient: Patient;
  doctor: Doctor;
  error: any;
  model = new User(18, 'Dr IQ');

  register = false;
  patientRegistration: boolean = true;
  registerError: string;
  registerMessage: string;

  //register patient
  @Input() registerPatientFirstname: string = '';
  @Input() registerPatientSurname: string = '';
  @Input() registerPatientEmail: string = '';
  @Input() registerPatientPassword: string = '';
  @Input() registerPatientPassword2: string = '';
  @Input() registerPatientAddress: string = '';
  @Input() registerPatientCity: string = '';
  @Input() registerPatientState: string = '';
  registerPatientFirstnameError: string = '';
  registerPatientSurnameError: string = '';
  registerPatientEmailError: string = '';
  registerPatientPasswordError: string = '';
  registerPatientPassword2Error: string = '';
  registerPatientAddressError: string = '';
  registerPatientCityError: string = '';
  registerPatientStateError: string = '';

  //register Doctor
  @Input() registerDoctorFirstname: string = '';
  @Input() registerDoctorSurname: string = '';
  @Input() registerDoctorEmail: string = '';
  @Input() registerDoctorPassword: string = '';
  @Input() registerDoctorPassword2: string = '';
  @Input() registerDoctorAddress: string = '';
  @Input() registerDoctorCity: string = '';
  @Input() registerDoctorState: string = '';
  registerDoctorFirstnameError: string = '';
  registerDoctorSurnameError: string = '';
  registerDoctorEmailError: string = '';
  registerDoctorPasswordError: string = '';
  registerDoctorPassword2Error: string = '';
  registerDoctorAddressError: string = '';
  registerDoctorCityError: string = '';
  registerDoctorStateError: string = '';

  onSubmit() {
    this.register = true;
  }

  registerPatient() {
    this.patientRegistration = true;

  }

  submitPatientRegistration() {
    let isError: boolean = false;
    if (this.registerPatientEmail.length == 0) {
      this.registerPatientFirstnameError = 'You have to enter Email';
      isError = true;
    }
    if (this.registerPatientFirstname.length == 0) {
      this.registerPatientFirstnameError = 'You have to enter Firstname';
      isError = true;
    }
    if (this.registerPatientSurname.length == 0) {
      this.registerPatientSurnameError = 'You have to enter Lastname';
      isError = true;
    }
    if (this.registerPatientAddress.length == 0) {
      this.registerPatientAddressError = 'You have to enter Address';
      isError = true;
    }
    if (this.registerPatientCity.length == 0) {
      this.registerPatientCityError = 'You have to enter City';
      isError = true;
    }
    if (this.registerPatientState.length == 0) {
      this.registerPatientStateError = 'You have to enter State';
      isError = true;
    }
    if (this.registerPatientPassword.length == 0) {
      this.registerPatientPasswordError = 'You have to enter Password';
      isError = true;
    } else {
      if (this.registerPatientPassword2.length == 0) {
        this.registerPatientPassword2Error = 'You have to enter Password';
        isError = true;
      }
      if (this.registerPatientPassword != this.registerPatientPassword2) {
        this.registerPatientFirstnameError = 'Passwords didn\'t match';
        isError = true;
      }
    }
    if (!isError) {
      this.doctorService.registerPatientObservable(this.registerPatientFirstname, this.registerPatientSurname,
        this.registerPatientEmail, this.registerPatientPassword, this.registerPatientAddress, this.registerPatientCity, this.registerPatientState).subscribe(
        (data: string) => {
          console.log(data);
          if (data['registerError']) {
            this.registerError = data['registerError'];
          } else {
            this.registerMessage = data['registerMessage'];
            this.toggleFlip();
          }
        },
        error => console.log(JSON.stringify(error))
      );
    }
  }

  submitDoctorRegistration() {
    let isError: boolean = false;
    if (this.registerDoctorEmail.length == 0) {
      this.registerDoctorFirstnameError = 'You have to enter Email';
      isError = true;
    }
    if (this.registerDoctorFirstname.length == 0) {
      this.registerDoctorFirstnameError = 'You have to enter Firstname';
      isError = true;
    }
    if (this.registerDoctorSurname.length == 0) {
      this.registerDoctorSurnameError = 'You have to enter Lastname';
      isError = true;
    }
    if (this.registerDoctorAddress.length == 0) {
      this.registerDoctorAddressError = 'You have to enter Address';
      isError = true;
    }
    if (this.registerDoctorCity.length == 0) {
      this.registerDoctorCityError = 'You have to enter City';
      isError = true;
    }
    if (this.registerDoctorState.length == 0) {
      this.registerDoctorStateError = 'You have to enter State';
      isError = true;
    }
    if (this.registerDoctorPassword.length == 0) {
      this.registerDoctorPasswordError = 'You have to enter Password';
      isError = true;
    } else {
      if (this.registerDoctorPassword2.length == 0) {
        this.registerDoctorPassword2Error = 'You have to enter Password';
        isError = true;
      }
      if (this.registerDoctorPassword != this.registerDoctorPassword2) {
        this.registerDoctorFirstnameError = 'Passwords didn\'t match';
        isError = true;
      }
    }
    if (!isError) {
      this.doctorService.registerDoctorObservable(this.registerDoctorFirstname, this.registerDoctorSurname,
        this.registerDoctorEmail, this.registerDoctorPassword, this.registerDoctorAddress, this.registerDoctorCity, this.registerDoctorState).subscribe(
        (data: string) => {
          console.log(data);
          if (data['registerError']) {
            this.registerError = data['registerError'];
          } else {
            this.registerMessage = data['registerMessage'];
            this.toggleFlip();
          }
        },
        error => console.log(JSON.stringify(error))
      );
    }
  }

  registerDoctor() {
    this.patientRegistration = false;
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
