import { TestBed } from '@angular/core/testing';

import { OddsApiService } from './odds-api.service';

describe('OddsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OddsApiService = TestBed.get(OddsApiService);
    expect(service).toBeTruthy();
  });
});
