import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSettingsPageComponent } from './patient-settings-page.component';

describe('PatientSettingsPageComponent', () => {
  let component: PatientSettingsPageComponent;
  let fixture: ComponentFixture<PatientSettingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientSettingsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
