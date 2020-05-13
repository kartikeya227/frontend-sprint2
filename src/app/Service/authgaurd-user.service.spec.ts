import { TestBed } from '@angular/core/testing';

import { AuthgaurdUserService } from './authgaurd-user.service';

describe('AuthgaurdUserService', () => {
  let service: AuthgaurdUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthgaurdUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
