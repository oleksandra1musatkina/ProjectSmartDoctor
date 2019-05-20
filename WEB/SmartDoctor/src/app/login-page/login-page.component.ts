import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from '../user';
import {Patient, LoginPageService} from './login-page.service';
import {ActivatedRoute, Router, RouterStateSnapshot} from '@angular/router';

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
              private router: Router) {

  }


  loginData: Patient;
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
        (data: Patient) => {
          this.loginData = {...data};
          console.log('login data: ' + JSON.stringify(this.loginData));
          console.log('login data2: ' + data);
          this.loginPageService.onLogin.emit(data);

          localStorage.setItem('user', JSON.stringify(this.loginData));
          this.router.navigateByUrl(this.returnUrl);
        }, // success path
        error => this.error = error// error path
      );

    console.log('login data: ' + this.loginData);
    console.log('login error data: ' + this.error);

  }
}
