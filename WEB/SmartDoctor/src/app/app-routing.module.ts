// importovanie ciest smerovaceho modula Angulara, rucne pridany
import {RouterModule, Routes} from '@angular/router';
// importovanie zakladneho balika Angularu, ktory sa automaticky sa vygeneroval
import {NgModule} from '@angular/core';
import {LoginPageComponent} from './login-page/login-page.component';
import {MyDoctorPageComponent} from './my-doctor-page/my-doctor-page.component';
import {MyPatientPageComponent} from './my-patient-page/my-patient-page.component';
import {DoctorHomePageComponent} from './doctor-home-page/doctor-home-page.component';
import {PatientHomePageComponent} from './patient-home-page/patient-home-page.component';
import {DoctorSettingsPageComponent} from './doctor-settings-page/doctor-settings-page.component';
import {PatientSettingsPageComponent} from './patient-settings-page/patient-settings-page.component';
import {DoctorWaitingRoomPageComponent} from './doctor-waiting-room-page/doctor-waiting-room-page.component';
import {PatientWaitingRoomPageComponent} from './patient-waiting-room-page/patient-waiting-room-page.component';
import {AuthGuardsService} from './auth-guards.service';


// smerovanie  pre cely project
const appRoutes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'my-doctor', component: MyDoctorPageComponent, canActivate: [AuthGuardsService]},
  {path: 'my-patient', component: MyPatientPageComponent, canActivate: [AuthGuardsService]},
  {path: 'doctor-home', component: DoctorHomePageComponent, canActivate: [AuthGuardsService]},
  {path: 'patient-home', component: PatientHomePageComponent, canActivate: [AuthGuardsService]},
  {path: 'doctor-settings', component: DoctorSettingsPageComponent, canActivate: [AuthGuardsService]},
  {path: 'patient-settings', component: PatientSettingsPageComponent, canActivate: [AuthGuardsService]},
  {path: 'doctor-waiting-room', component: DoctorWaitingRoomPageComponent, canActivate: [AuthGuardsService]},
  {path: 'patient-waiting-room', component: PatientWaitingRoomPageComponent, canActivate: [AuthGuardsService]},
  // ked daju link stranky presmeruje na Login
  {path: '', redirectTo: '/patient-home', pathMatch: 'full'},
  // ak niekto zada cestu ktora neexistuje presmerujeme ho sem
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

// je to kvoli tomu aby sa dala debbagovat smerovanie
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
