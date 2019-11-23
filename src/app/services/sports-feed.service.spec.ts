import { TestBed } from '@angular/core/testing';

import { SportsFeedService } from './sports-feed.service';

describe('SportsFeedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SportsFeedService = TestBed.get(SportsFeedService);
    expect(service).toBeTruthy();
  });
});
