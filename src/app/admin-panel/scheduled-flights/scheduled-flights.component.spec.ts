import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledFlightsComponent } from './scheduled-flights.component';

describe('ScheduledFlightsComponent', () => {
  let component: ScheduledFlightsComponent;
  let fixture: ComponentFixture<ScheduledFlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledFlightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
