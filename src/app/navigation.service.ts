import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(public router: Router) {}

  forceNavigation(path: string, name?: string) {
    if (name) {
      this.router
        .navigate([path], { fragment: name })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      this.router.navigate([path]);
    }
  }
}
