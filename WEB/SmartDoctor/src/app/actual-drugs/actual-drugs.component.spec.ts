import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualDrugsComponent } from './actual-drugs.component';

describe('ActualDrugsComponent', () => {
  let component: ActualDrugsComponent;
  let fixture: ComponentFixture<ActualDrugsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualDrugsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
