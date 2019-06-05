import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientShowNotesComponent } from './patient-show-notes.component';

describe('PatientShowNotesComponent', () => {
  let component: PatientShowNotesComponent;
  let fixture: ComponentFixture<PatientShowNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientShowNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientShowNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
