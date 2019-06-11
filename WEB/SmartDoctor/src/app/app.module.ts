import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ChartsModule} from 'ng2-charts';


import {AppComponent} from './app.component';
import {DoctorSettingsPageComponent} from './doctor-settings-page/doctor-settings-page.component';
import {PatientSettingsPageComponent} from './patient-settings-page/patient-settings-page.component';
import {PatientHomePageComponent} from './patient-home-page/patient-home-page.component';
import {DoctorHomePageComponent} from './doctor-home-page/doctor-home-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {MyDoctorPageComponent} from './my-doctor-page/my-doctor-page.component';
import {MyPatientPageComponent} from './my-patient-page/my-patient-page.component';
import {PatientWaitingRoomPageComponent} from './patient-waiting-room-page/patient-waiting-room-page.component';
import {DoctorWaitingRoomPageComponent} from './doctor-waiting-room-page/doctor-waiting-room-page.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ActualDrugsComponent} from './actual-drugs/actual-drugs.component';
import {DoctorComponent} from './doctor/doctor.component';
import {PatientShowNotesComponent} from './patient-show-notes/patient-show-notes.component';
import {PatientWaitingRoomRequesComponent} from './patient-waiting-room-reques/patient-waiting-room-reques.component';
import {NotificationPanelComponent} from './notification-panel/notification-panel.component';
import {TextSettingsComponent} from './text-settings/text-settings.component';
import {PetientInsurenceComponent} from './petient-insurence/petient-insurence.component';
import {PetientWaitingroomInfoComponent} from './petient-waitingroom-info/petient-waitingroom-info.component';
import {LastExaminationsComponent} from './last-examinations/last-examinations.component';
import {PendingExaminationsComponent} from './pending-examinations/pending-examinations.component';
import {AskFoOnlineHelpComponent} from './ask-fo-online-help/ask-fo-online-help.component';
import {SettingsPhotoComponent} from './settings-photo/settings-photo.component';
import {SettingsOpeningHoursComponent} from './settings-opening-hours/settings-opening-hours.component';
import {SettingsDoctorInsurencesComponent} from './settings-doctor-insurences/settings-doctor-insurences.component';
import {DisplayAndSetComponent} from './display-and-set/display-and-set.component';
import {PatientComponent} from './patient/patient.component';
import {DlDateTimeDateModule, DlDateTimePickerModule} from 'angular-bootstrap-datetimepicker';
import {HomeComponent} from './home/home.component';
import { PatientDetailPageComponent } from './patient-detail-page/patient-detail-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { ExaminationDetailPageComponent } from './examination-detail-page/examination-detail-page.component';
import { BarchartComponent } from './barchart/barchart.component';

// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    DoctorSettingsPageComponent,
    PatientSettingsPageComponent,
    PatientHomePageComponent,
    DoctorHomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    MyDoctorPageComponent,
    MyPatientPageComponent,
    PatientWaitingRoomPageComponent,
    DoctorWaitingRoomPageComponent,
    ActualDrugsComponent,
    DoctorComponent,
    PatientShowNotesComponent,
    PatientWaitingRoomRequesComponent,
    NotificationPanelComponent,
    TextSettingsComponent,
    PetientInsurenceComponent,
    PetientWaitingroomInfoComponent,
    LastExaminationsComponent,
    PendingExaminationsComponent,
    AskFoOnlineHelpComponent,
    SettingsPhotoComponent,
    SettingsOpeningHoursComponent,
    SettingsDoctorInsurencesComponent,
    DisplayAndSetComponent,
    PatientComponent,
    HomeComponent,
    PatientDetailPageComponent,
    DetailPageComponent,
    ExaminationDetailPageComponent,
    BarchartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    BrowserAnimationsModule,
    ChartsModule
    // FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
