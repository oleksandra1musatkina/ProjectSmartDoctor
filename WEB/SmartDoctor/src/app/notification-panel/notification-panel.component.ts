import {Component, OnInit} from '@angular/core';
import {DoctorService, NotificationItem} from '../services/doctor.service';
import {Doctor, Examination, Patient} from '../login-page/login-page.service';

@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html',
  styleUrls: ['./notification-panel.component.css']
})
export class NotificationPanelComponent implements OnInit {

  notifications: {}[] = null;
  showModal: boolean = false;

  modalNotification: {} = null;
  isPatient: boolean = false;


  constructor(private doctorService: DoctorService) {
  }

  getNotifications() {
    console.log('som v get notifications');
    this.doctorService.getUserNotificationObservable()
      .subscribe(
        (data: NotificationItem[]) => {
          let ntfctons = data;
          console.log(JSON.stringify(ntfctons));
          // for (let notification of this.ntfctons) {
          this.doctorService.getPatientsListObservable()
            .subscribe(
              (patientsData: Patient[]) => {
                let patients: Patient[] = patientsData;
                this.doctorService.getDoctorsListObservable()
                  .subscribe(
                    (doctorData: Doctor[]) => {
                      let doctors: Doctor[] = doctorData;
                      for (let notification of this.notifications) {
                        if (notification['fromtype'] == 'patient') {
                          console.log('od pacienta');
                          console.log(patients.length);
                          for (let patient of patients) {
                            console.log(JSON.stringify(patient));
                            console.log('toto sa kontroluje: ' + notification['from'] + ', ' + patient._id);
                            console.log(JSON.stringify(notification));
                            if (patient._id == notification['from']) {

                              console.log('nasiel som pacienta');
                              notification['userdata'] = patient;
                            }
                          }
                        } else {
                          for (let doctor of doctors) {
                            if (doctor._id == notification['from']) {
                              notification['userdata'] = doctor;
                            }
                          }
                        }
                      }

                    },
                    error => console.log(JSON.stringify(error))
                  );
              },
              error => console.log(JSON.stringify(error))
            );

          this.notifications = ntfctons;
        },
        error => console.log(JSON.stringify(error))
      );


  }

  onClick(notificationObject: {}) {
    console.log('som v onclick notification');
    console.log('notification object: ' + JSON.stringify(notificationObject));
    this.modalNotification = notificationObject;
    this.showModal = true;
  }

  dismisNotification(notificationId) {
    console.log('nid: ' + notificationId);
    this.doctorService.deleteNotificationObservable(notificationId)
      .subscribe(
        (info: string) => {
          console.log(info);
        },
        error => console.log(JSON.stringify(error))
      );
    this.getNotifications();
    this.hide();
  }

  accept(notification) {
    this.doctorService.addNotificationObservable(this.doctorService.createNotification(notification, 'accepted'))
      .subscribe(
        (info: string) => {
          console.log(info);
          let examination: {} = {};
          let patientid;
          if (notification.totype == 'patient') {
            examination['doctor'] = notification.from;
            patientid = notification.to;
          } else {
            examination['doctor'] = notification.to;
            patientid = notification.from;
          }
          examination['type'] = notification.heading;
          examination['date'] = notification.eventdate;
          examination['note'] = notification.message;
          this.doctorService.addExaminationObservable(patientid, examination)
            .subscribe(
              (info: string) => {
                console.log(info);
                this.doctorService.refreshUserData(this).subscribe((m: {}) => {
                  if (m == this) {
                    // callback();
                    // items= items.slice();
                    // this.patients=this.patients.slice();
                    this.dismisNotification(notification['_id']);
                  }
                });
              },
              error => console.log(JSON.stringify(error))
            );
        },
        error => console.log(JSON.stringify(error))
      );

  }

  decline(notification: {}) {
    // console.log('new notification: ' + JSON.stringify(this.createNotification(notification, 'rejected')));
    this.doctorService.addNotificationObservable(this.doctorService.createNotification(notification, 'rejected'))
      .subscribe(
        (info: string) => {
          console.log(info);
        },
        error => console.log(JSON.stringify(error))
      );

    this.dismisNotification(notification['_id']);


  }


  hide() {
    this.showModal = false;
  }

  setInsurance(id) {
    // this.doctorService.setPatientInsuranceObservable(id).subscribe(
    //   (data: string) => {
    //     console.log(data);
    //     this.doctorService.refreshUserData(this).subscribe((m: {}) => {
    //       if (m == this) {
    //         // callback();
    //         // items= items.slice();
    //         // this.patients=this.patients.slice();
    //         this.getPatientInsurance();
    //       }
    //     });
    //   },
    //   error => console.log(JSON.stringify(error))
    // );
    this.hide();
  }

  ngOnInit() {
    this.getNotifications();
    this.isPatient = this.doctorService.isPatient();
  }

}
