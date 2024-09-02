import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const jsonString = sessionStorage.getItem('userData');
    if (jsonString) {
      const userData = JSON.parse(jsonString);
      console.log(userData.role);
      if (
        userData.role == 'admin' ||
        userData.role == 'vender' ||
        userData.role == 'customer' 
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      console.log('No user data found in session storage.');
      return false;
    }
  } else {
    console.log('Not running in the browser.');
    return false;
  }
};
