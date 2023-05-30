import { TestBed } from '@angular/core/testing';

import { ReadingFeedService } from './reading-feed.service';

describe('ReadingFeedService', () => {
  let service: ReadingFeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadingFeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
