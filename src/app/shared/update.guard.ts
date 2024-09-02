import { CanActivateFn } from '@angular/router';

export const updateGuard: CanActivateFn = (route, state) => {
  const jsonString = sessionStorage.getItem('userData');
  if (jsonString) {
    const userData = JSON.parse(jsonString);
    console.log(userData.role);
    if(userData.role == 'admin'){
      return true
    }else{
    return false
    }
  } else {
    console.log('No user data found in local storage.');
    return false
  }
};
