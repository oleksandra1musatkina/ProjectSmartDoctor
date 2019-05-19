import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientWaitingRoomPageComponent } from './patient-waiting-room-page.component';

describe('PatientWaitingRoomPageComponent', () => {
  let component: PatientWaitingRoomPageComponent;
  let fixture: ComponentFixture<PatientWaitingRoomPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientWaitingRoomPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientWaitingRoomPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
