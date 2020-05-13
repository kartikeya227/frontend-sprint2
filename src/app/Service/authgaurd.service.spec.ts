import {TestBed} from '@angular/core/testing';

import {AuthgaurdAdminService} from './authgaurd-admin.service';

describe('AuthgaurdService', () => {
  let service: AuthgaurdAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthgaurdAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
