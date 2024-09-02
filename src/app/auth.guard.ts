import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    if (sessionStorage.getItem('token') != null) {
      return true;
    } else {
      return false;
    }
  } else {
    console.log('Not running in the browser.');
    return false;
  }
};
