import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsOpeningHoursComponent } from './settings-opening-hours.component';

describe('SettingsOpeningHoursComponent', () => {
  let component: SettingsOpeningHoursComponent;
  let fixture: ComponentFixture<SettingsOpeningHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsOpeningHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsOpeningHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
