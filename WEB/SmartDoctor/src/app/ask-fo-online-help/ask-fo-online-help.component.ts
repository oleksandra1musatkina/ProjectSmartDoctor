import {Component, OnInit} from '@angular/core';
import {Patient} from '../login-page/login-page.service';

@Component({
  selector: 'app-ask-fo-online-help',
  templateUrl: './ask-fo-online-help.component.html',
  styleUrls: ['./ask-fo-online-help.component.css']
})
export class AskFoOnlineHelpComponent implements OnInit {

  showModal: boolean;
  patient: Patient;

  constructor() {
  }

  ngOnInit() {
    this.patient = JSON.parse(localStorage.getItem('user'));

  }

  onClick(event) {
    this.showModal = true; // Show-Hide Modal Check
  }

  //Bootstrap Modal Close event
  hide() {
    this.showModal = false;
  }
}
