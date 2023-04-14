import { TestBed } from '@angular/core/testing';

import { HttpGuard } from './http.guard';

describe('HttpGuard', () => {
  let guard: HttpGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HttpGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
