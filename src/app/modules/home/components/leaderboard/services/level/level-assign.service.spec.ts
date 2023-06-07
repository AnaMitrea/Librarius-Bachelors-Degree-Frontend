import { TestBed } from '@angular/core/testing';

import { LevelAssignService } from './level-assign.service';

describe('LevelAssignService', () => {
  let service: LevelAssignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevelAssignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
