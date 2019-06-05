import {Component, Input, OnInit} from '@angular/core';
import {DisplayandsetData, DoctorService} from '../services/doctor.service';

@Component({
  selector: 'app-display-and-set',
  templateUrl: './display-and-set.component.html',
  styleUrls: ['./display-and-set.component.css']
})


export class DisplayAndSetComponent implements OnInit {

  error: any;
  data: DisplayandsetData;
  editing = false;
  @Input() name: string;
  // @Input() displayApi: string;
  @Input() display: boolean;
  // @Input() saveApi: string;
  // @Input() api: string;
  @Input() inputData: string;
  @Input() key: string;

  constructor(private doctorService: DoctorService) {
  }

  showDisplayandsaveData() {
    let savedUser;
    if (this.doctorService.isPatient()) {
      savedUser = this.doctorService.getSavedPatient();
    } else {
      savedUser = this.doctorService.getSavedDoctor();
    }
    this.data = {data: savedUser[this.key]};
  }

  saveDisplayandsaveData(identifier: {} = null) {
    // console.log('___key: ' + this.key);
    if (this.inputData == null || this.inputData.length == 0) {
      return;
    }
    this.doctorService.saveData(this.key, this.inputData).subscribe(
      (data: string) => {
        console.log(data);
        this.doctorService.refreshUserData(identifier).subscribe((m: {}) => {
          if (m == identifier) {
            // callback();
            this.showDisplayandsaveData();
          }
        });
      }, // success path
      error => this.error = error // error path
    );
  }

  edit() {
    this.editing = !this.editing;
  }

  save() {
    if (this.display) {
      this.saveDisplayandsaveData(this);
    } else {
      this.saveDisplayandsaveData();
    }
    console.log(this.inputData);
    this.editing = !this.editing;
  }

  ngOnInit() {
    if (this.display) {
      this.showDisplayandsaveData();
    }
  }
}
