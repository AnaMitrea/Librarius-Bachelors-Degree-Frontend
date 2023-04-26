import { TestBed } from '@angular/core/testing';

import { UserWishlistService } from './user-wishlist.service';

describe('UserWishlistService', () => {
  let service: UserWishlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserWishlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
