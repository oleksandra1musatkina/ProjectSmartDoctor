import {Component, OnInit} from '@angular/core';
import {Patient} from '../login-page/login-page.service';

@Component({
  selector: 'app-actual-drugs',
  templateUrl: './actual-drugs.component.html',
  styleUrls: ['./actual-drugs.component.css']
})
export class ActualDrugsComponent implements OnInit {

  patient: Patient;

  constructor() {
  }

  ngOnInit() {
    this.patient = JSON.parse(localStorage.getItem('user'));
  }

}
