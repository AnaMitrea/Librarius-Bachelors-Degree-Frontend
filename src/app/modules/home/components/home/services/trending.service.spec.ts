import { TestBed } from '@angular/core/testing';

import { TrendingService } from './trending.service';

describe('TrendingServiceService', () => {
  let service: TrendingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrendingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
