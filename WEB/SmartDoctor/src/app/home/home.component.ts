import {Component, OnInit} from '@angular/core';
import {DoctorService} from '../services/doctor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isPatient: boolean = false;

  constructor(private doctorService: DoctorService) {
  }

  ngOnInit() {
    if (this.doctorService.isPatient()) {
      this.isPatient = true;
    }
  }

}
