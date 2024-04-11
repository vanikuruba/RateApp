import { TestBed } from '@angular/core/testing';

import { LiborService } from './libor.service';

describe('LiborService', () => {
  let service: LiborService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiborService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
