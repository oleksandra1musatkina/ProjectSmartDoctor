import {Component, OnInit} from '@angular/core';
import {Doctor, Patient} from '../login-page/login-page.service';
import {DoctorService} from '../services/doctor.service';
import {Observable} from 'rxjs';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-settings-photo',
  templateUrl: './settings-photo.component.html',
  styleUrls: ['./settings-photo.component.css']
})
export class SettingsPhotoComponent implements OnInit {
  public imagePath;
  imgURL: any;
  public message: string;
  uploaded: boolean = false;
  patient: Patient = null;
  doctor: Doctor = null;
  showModal: boolean;

  constructor(private doctorService: DoctorService) {
  }


  // imageToShow: any;

  onClick(event) {
    this.showModal = true; // Show-Hide Modal Check
  }

  hide() {
    this.showModal = false;
  }

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  upload() {
    if (this.imagePath) {

      console.log(this.imagePath[0]);

      this.doctorService.uploadImageObservable(this.imagePath[0])
        .subscribe(
          //   event => {
          //     if(event.type === HttpEventType.UploadProgress){
          //       let UploadProgress = Math.round((event.loaded / event.total) * 100);
          //       console.log(UploadProgress);
          //     } else if(event.type === HttpEventType.Response) {
          //       let response: any;
          //       response = event.body;
          //       console.log(response);
          //     }
          //   }


          (data: string) => {
            console.log('ok: ' + JSON.stringify(data));
            if (this.doctorService.isPatient()) {
              let file: File = this.imagePath[0];
              this.doctorService.setPatientImageName(this.doctorService.getSavedPatient()._id, file.name)
                .subscribe(
                  (data: {}) => {
                    console.log('set name ok: ' + JSON.stringify(data));
                    this.hide();
                    this.refreshData();
                  }, error => {
                    console.log('error set name: ' + JSON.stringify(error));
                  }
                );
            } else {
              let file: File = this.imagePath[0];
              this.doctorService.setDoctorImageName(this.doctorService.getSavedDoctor()._id, file.name)
                .subscribe(
                  (data: {}) => {
                    console.log('set name ok: ' + JSON.stringify(data));
                    this.hide();
                    this.refreshData();
                  }, error => {
                    console.log('error set name: ' + JSON.stringify(error));
                  }
                );
            }
          }, error => {
            console.log('error: ' + JSON.stringify(error));
          }
        );
    } else {
      this.message = 'Choose image first!';
    }
  }

  refreshData() {
    this.doctorService.refreshUserData(this).subscribe((m: {}) => {
      if (m == this) {
        if (this.doctorService.isPatient()) {
          this.patient = null;
          this.patient = this.doctorService.getSavedPatient();
        } else {
          this.doctor = null;
          this.doctor = this.doctorService.getSavedDoctor();
        }
      }
    });

  }

  ngOnInit() {
    this.refreshData();


  }

}
