import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetientWaitingroomInfoComponent } from './petient-waitingroom-info.component';

describe('PetientWaitingroomInfoComponent', () => {
  let component: PetientWaitingroomInfoComponent;
  let fixture: ComponentFixture<PetientWaitingroomInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetientWaitingroomInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetientWaitingroomInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
