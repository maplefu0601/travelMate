import { TestBed } from '@angular/core/testing';

import { JwtHandleService } from './jwt-handle.service';

describe('JwtHandleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JwtHandleService = TestBed.get(JwtHandleService);
    expect(service).toBeTruthy();
  });
});
