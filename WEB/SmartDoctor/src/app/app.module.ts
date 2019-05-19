import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DoctorSettingsPageComponent } from './doctor-settings-page/doctor-settings-page.component';
import { PatientSettingsPageComponent } from './patient-settings-page/patient-settings-page.component';
import { PatientHomePageComponent } from './patient-home-page/patient-home-page.component';
import { DoctorHomePageComponent } from './doctor-home-page/doctor-home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { MyDoctorPageComponent } from './my-doctor-page/my-doctor-page.component';
import { MyPatientPageComponent } from './my-patient-page/my-patient-page.component';
import { PatientWaitingRoomPageComponent } from './patient-waiting-room-page/patient-waiting-room-page.component';
import { DoctorWaitingRoomPageComponent } from './doctor-waiting-room-page/doctor-waiting-room-page.component';

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
    DoctorWaitingRoomPageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
