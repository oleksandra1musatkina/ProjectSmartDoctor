import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSettingsPageComponent } from './doctor-settings-page.component';

describe('DoctorSettingsPageComponent', () => {
  let component: DoctorSettingsPageComponent;
  let fixture: ComponentFixture<DoctorSettingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorSettingsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
