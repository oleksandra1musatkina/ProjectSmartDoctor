import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingExaminationsComponent } from './pending-examinations.component';

describe('PendingExaminationsComponent', () => {
  let component: PendingExaminationsComponent;
  let fixture: ComponentFixture<PendingExaminationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingExaminationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingExaminationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
