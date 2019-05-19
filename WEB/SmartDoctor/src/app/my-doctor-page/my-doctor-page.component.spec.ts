import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDoctorPageComponent } from './my-doctor-page.component';

describe('MyDoctorPageComponent', () => {
  let component: MyDoctorPageComponent;
  let fixture: ComponentFixture<MyDoctorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDoctorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDoctorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
