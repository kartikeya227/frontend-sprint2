import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelLandingComponent } from './admin-panel-landing.component';

describe('AdminPanelLandingComponent', () => {
  let component: AdminPanelLandingComponent;
  let fixture: ComponentFixture<AdminPanelLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
