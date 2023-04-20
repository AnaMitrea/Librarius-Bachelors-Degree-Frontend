import { TestBed } from '@angular/core/testing';

import { CacheRequestInterceptor } from '@app-core/interceptor';

describe('CacheRequestInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CacheRequestInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CacheRequestInterceptor = TestBed.inject(CacheRequestInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
