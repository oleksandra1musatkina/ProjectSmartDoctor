import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAndSetComponent } from './display-and-set.component';

describe('DisplayAndSetComponent', () => {
  let component: DisplayAndSetComponent;
  let fixture: ComponentFixture<DisplayAndSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayAndSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAndSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
