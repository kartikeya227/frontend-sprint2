import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMakeBookingComponent } from './user-make-booking.component';

describe('UserMakeBookingComponent', () => {
  let component: UserMakeBookingComponent;
  let fixture: ComponentFixture<UserMakeBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMakeBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMakeBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
