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

  editError: string = null;

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
    this.editError = null;
    // console.log('___key: ' + this.key);
    if (this.inputData == null || this.inputData.length == 0) {

      return;
    }
    if (this.key == 'birdthdate') {
      let regexp = new RegExp('^\\s*(3[01]|[12][0-9]|0?[1-9])\\.(1[012]|0?[1-9])\\.((?:19|20)\\d{2})\\s*$');
      let test = regexp.test(this.inputData);
      if (!test) {
        this.editError = 'wrong date format!';
        return;
      }
    }
    if (this.key == 'firstname' || this.key == 'surname') {
      if (this.inputData.length < 2) {
        this.editError = 'at least two characters needed';
        return;
      }
      this.inputData.toLowerCase();
      this.inputData = this.inputData.charAt(0).toUpperCase() + this.inputData.slice(1);

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
