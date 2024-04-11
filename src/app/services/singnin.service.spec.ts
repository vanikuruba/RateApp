import { TestBed } from '@angular/core/testing';

import { SingninService } from './singnin.service';

describe('SingninService', () => {
  let service: SingninService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingninService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
