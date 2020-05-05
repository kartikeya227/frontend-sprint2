import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPanelLandingComponent } from './user-panel-landing.component';

describe('UserPanelLandingComponent', () => {
  let component: UserPanelLandingComponent;
  let fixture: ComponentFixture<UserPanelLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPanelLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPanelLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
