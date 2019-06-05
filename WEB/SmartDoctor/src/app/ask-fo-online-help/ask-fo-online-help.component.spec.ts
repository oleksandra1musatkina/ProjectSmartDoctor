import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskFoOnlineHelpComponent } from './ask-fo-online-help.component';

describe('AskFoOnlineHelpComponent', () => {
  let component: AskFoOnlineHelpComponent;
  let fixture: ComponentFixture<AskFoOnlineHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskFoOnlineHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskFoOnlineHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
