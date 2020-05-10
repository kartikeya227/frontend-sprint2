import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminScheduledFlightComponent } from './admin-scheduled-flight.component';

describe('AdminScheduledFlightComponent', () => {
  let component: AdminScheduledFlightComponent;
  let fixture: ComponentFixture<AdminScheduledFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminScheduledFlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminScheduledFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
