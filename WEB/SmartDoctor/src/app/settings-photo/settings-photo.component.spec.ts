import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPhotoComponent } from './settings-photo.component';

describe('SettingsPhotoComponent', () => {
  let component: SettingsPhotoComponent;
  let fixture: ComponentFixture<SettingsPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
