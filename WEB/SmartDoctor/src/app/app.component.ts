import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginPageService, Patient} from './login-page/login-page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SmartDoctor';
  patient: Patient;

  constructor(private router: Router, private loginPageService: LoginPageService) {
    this.patient = JSON.parse(localStorage.getItem('user'));
    this.loginPageService.onLogin.subscribe({
      next: (event: Patient) => {
        this.patient = event;
      }
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);

  }

  ngOnInit(): void {
  }
}
