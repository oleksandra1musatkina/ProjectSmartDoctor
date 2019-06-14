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
  error: string = null;
  // model = new User(18, 'Dr IQ');
  @Input() loginEmail: string = '';
  loginEmailError: string = null;
  @Input() loginPassword: string = '';
  loginPasswordError: string = null;


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
    this.registerPatientFirstnameError = '';
    this.registerPatientSurnameError = '';
    this.registerPatientEmailError = '';
    this.registerPatientPasswordError = '';
    this.registerPatientPassword2Error = '';
    this.registerPatientAddressError = '';
    this.registerPatientCityError = '';
    this.registerPatientStateError = '';
    let isError: boolean = false;
    if (this.registerPatientEmail.length == 0) {
      this.registerPatientEmailError = 'You have to enter Email';
      isError = true;
    } else {
      let regexp = new RegExp('(.+)@(.+){2,}\\.(.+){2,}');
      let test = regexp.test(this.registerPatientEmail);
      if (!test) {
        this.registerPatientEmailError = 'wrong email format!';
        isError = true;
      }
    }

    if (this.registerPatientFirstname.length < 2) {
      this.registerPatientFirstnameError = 'Firstname must have 2 and more characters';
      isError = true;
    } else {
      this.registerPatientFirstname.toLowerCase();
      this.registerPatientFirstname = this.registerPatientFirstname.charAt(0).toUpperCase() + this.registerPatientFirstname.slice(1);

    }
    if (this.registerPatientSurname.length < 2) {
      this.registerPatientSurnameError = 'Surname must have 2 and more characters';
      isError = true;
    } else {
      this.registerPatientSurname.toLowerCase();
      this.registerPatientSurname = this.registerPatientSurname.charAt(0).toUpperCase() + this.registerPatientSurname.slice(1);

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
    if (this.registerPatientPassword.length < 4) {
      this.registerPatientPasswordError = 'Password must have 4 anf more characters';
      isError = true;
    } else {
      if (this.registerPatientPassword2.length < 4) {
        this.registerPatientPassword2Error = 'Password must have 4 anf more characters';
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
    this.registerDoctorFirstnameError = '';
    this.registerDoctorSurnameError = '';
    this.registerDoctorEmailError = '';
    this.registerDoctorPasswordError = '';
    this.registerDoctorPassword2Error = '';
    this.registerDoctorAddressError = '';
    this.registerDoctorCityError = '';
    this.registerDoctorStateError = '';
    let isError: boolean = false;
    if (this.registerDoctorEmail.length == 0) {
      this.registerDoctorEmailError = 'You have to enter Email';
      isError = true;
    } else {
      let regexp = new RegExp('(.+)@(.+){2,}\\.(.+){2,}');
      let test = regexp.test(this.registerDoctorEmail);
      if (!test) {
        this.registerDoctorEmailError = 'wrong email format!';
        isError = true;
      }
    }
    if (this.registerDoctorFirstname.length < 2) {
      this.registerDoctorFirstnameError = 'Firstname must have 2 and more characters';
      isError = true;
    } else {
      this.registerDoctorFirstname.toLowerCase();
      this.registerDoctorFirstname = this.registerDoctorFirstname.charAt(0).toUpperCase() + this.registerDoctorFirstname.slice(1);

    }
    if (this.registerDoctorSurname.length < 2) {
      this.registerDoctorSurnameError = 'Surname must have 2 and more characters';
      isError = true;
    } else {
      this.registerDoctorSurname.toLowerCase();
      this.registerDoctorSurname = this.registerDoctorSurname.charAt(0).toUpperCase() + this.registerDoctorSurname.slice(1);

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
    if (this.registerDoctorPassword.length < 4) {
      this.registerDoctorPasswordError = 'Password must have 4 and more characters';
      isError = true;
    } else {
      if (this.registerDoctorPassword2.length < 4) {
        this.registerDoctorPassword2Error = 'Password must have 4 and more characters';
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
        }, error => {
          this.registerError = 'unknown error try again later';
          error => console.log(JSON.stringify(error));

        }
      );
    }
  }

  registerDoctor() {
    this.patientRegistration = false;
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {

        this.returnUrl = params.returnUrl || '/';
      });

  }

  sendLoginRequest(username: string, password: string) {
    console.log('username: ' + username);
    console.log('password: ' + password);
    this.loginEmailError = null;
    this.loginPasswordError = null;
    if (!username || username.length == 0) {
      this.loginEmailError = 'Email is required!';

    }
    if (!password || password.length == 0) {
      this.loginPasswordError = 'Password is required!';
      console.log('nie je heslo');
    }
    if (this.loginPasswordError || this.loginEmailError) {
      return;
    }
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

        error => {
          this.error = 'Wrong credentials!';
          console.log('chyba');
        }// error path
      );

    console.log('login data: ' + this.patient);
    console.log('login error data: ' + this.error);

  }
}
