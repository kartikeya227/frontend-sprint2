import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalService} from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthgaurdUserService {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private globalService: GlobalService) {
  }

  /** *
   * Auth gaurd for User exclusive routes.
   */
  canActivate() {
    if (this.globalService.getLoginStatus() && this.globalService.getCurrentUser().userType == 'User') {
      return true;
    } else {
      alert('Login required to access the page.');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
