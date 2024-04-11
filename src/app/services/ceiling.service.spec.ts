import { TestBed } from '@angular/core/testing';

import { CeilingService } from './ceiling.service';

describe('CeilingService', () => {
  let service: CeilingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CeilingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
