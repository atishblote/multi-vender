import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { venderGuard } from './vender.guard';

describe('venderGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => venderGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
