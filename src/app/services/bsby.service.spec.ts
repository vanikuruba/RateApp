import { TestBed } from '@angular/core/testing';

import { BsbyService } from './bsby.service';

describe('BsbyService', () => {
  let service: BsbyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BsbyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
