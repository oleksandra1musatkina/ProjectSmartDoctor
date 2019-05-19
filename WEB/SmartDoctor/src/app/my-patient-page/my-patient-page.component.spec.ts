import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPatientPageComponent } from './my-patient-page.component';

describe('MyPatientPageComponent', () => {
  let component: MyPatientPageComponent;
  let fixture: ComponentFixture<MyPatientPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPatientPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPatientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
