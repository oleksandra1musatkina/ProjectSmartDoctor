import {Component, Input, OnInit} from '@angular/core';
import {Patient} from '../login-page/login-page.service';

@Component({
  selector: 'app-text-settings',
  templateUrl: './text-settings.component.html',
  styleUrls: ['./text-settings.component.css']
})
export class TextSettingsComponent implements OnInit {

  error: any;
  data: {}[] = [];

  @Input() keys: string[];
  user: Patient;

  constructor() {
  }

  edit(key) {
    this.data[key]['editing'] = !this.data[key]['editing'];
  }

  save(key) {
    // this.saveDisplayandsaveData(this.saveApi);
    // console.log(this.inputData);
    this.data[key]['editing'] = !this.data[key]['editing'];
    // if (this.display) {
    //   this.showDisplayandsaveData(this.displayApi);
    // }
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.keys.forEach(value => {
      let userElement = this.user[value];
      if (userElement) {
        console.log('nasiel som: ' + userElement);
        this.data.push({name: value, value: userElement, editing: false});
      }
      console.log(value);
    });
  }

}
