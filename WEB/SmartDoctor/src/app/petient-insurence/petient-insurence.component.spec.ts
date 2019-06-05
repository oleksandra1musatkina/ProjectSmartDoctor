import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetientInsurenceComponent } from './petient-insurence.component';

describe('PetientInsurenceComponent', () => {
  let component: PetientInsurenceComponent;
  let fixture: ComponentFixture<PetientInsurenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetientInsurenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetientInsurenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
