import { TestBed } from '@angular/core/testing';

import { UserAuthorsService } from './user-authors.service';

describe('UserAuthorsService', () => {
  let service: UserAuthorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAuthorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
