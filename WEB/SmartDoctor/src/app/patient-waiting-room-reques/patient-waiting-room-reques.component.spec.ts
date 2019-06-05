import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientWaitingRoomRequesComponent } from './patient-waiting-room-reques.component';

describe('PatientWaitingRoomRequesComponent', () => {
  let component: PatientWaitingRoomRequesComponent;
  let fixture: ComponentFixture<PatientWaitingRoomRequesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientWaitingRoomRequesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientWaitingRoomRequesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
