import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { readGuard } from './read.guard';

describe('readGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => readGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
