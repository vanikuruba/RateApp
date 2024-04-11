import { TestBed } from '@angular/core/testing';

import { SofrService } from './sofr.service';

describe('SofrService', () => {
  let service: SofrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SofrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
