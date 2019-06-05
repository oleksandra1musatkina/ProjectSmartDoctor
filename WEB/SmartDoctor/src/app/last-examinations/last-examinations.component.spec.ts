import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastExaminationsComponent } from './last-examinations.component';

describe('LastExaminationsComponent', () => {
  let component: LastExaminationsComponent;
  let fixture: ComponentFixture<LastExaminationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastExaminationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastExaminationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
