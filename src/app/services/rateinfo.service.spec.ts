import { TestBed } from '@angular/core/testing';

import { RateinfoService } from './rateinfo.service';

describe('RateinfoService', () => {
  let service: RateinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RateinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
