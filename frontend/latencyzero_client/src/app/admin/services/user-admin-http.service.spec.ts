import { TestBed } from '@angular/core/testing';

import { UserAdminHttpService } from './user-admin-http.service';

describe('UserAdminHttpService', () => {
  let service: UserAdminHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAdminHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
