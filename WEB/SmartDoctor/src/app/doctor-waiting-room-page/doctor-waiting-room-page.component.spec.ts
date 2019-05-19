import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorWaitingRoomPageComponent } from './doctor-waiting-room-page.component';

describe('DoctorWaitingRoomPageComponent', () => {
  let component: DoctorWaitingRoomPageComponent;
  let fixture: ComponentFixture<DoctorWaitingRoomPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorWaitingRoomPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorWaitingRoomPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
