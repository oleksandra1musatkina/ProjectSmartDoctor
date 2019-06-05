import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDoctorInsurencesComponent } from './settings-doctor-insurences.component';

describe('SettingsDoctorInsurencesComponent', () => {
  let component: SettingsDoctorInsurencesComponent;
  let fixture: ComponentFixture<SettingsDoctorInsurencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsDoctorInsurencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDoctorInsurencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
