import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationDetailPageComponent } from './examination-detail-page.component';

describe('ExaminationDetailPageComponent', () => {
  let component: ExaminationDetailPageComponent;
  let fixture: ComponentFixture<ExaminationDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminationDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminationDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
