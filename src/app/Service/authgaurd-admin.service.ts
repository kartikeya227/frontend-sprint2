import {Injectable} from '@angular/core';
import {ActivatedRoute, CanActivate, Router} from '@angular/router';
import {GlobalService} from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthgaurdAdminService implements CanActivate {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private globalService: GlobalService) {
  }

  canActivate() {
    alert('AuthGaurd activated');
    if (this.globalService.getLoginStatus() && this.globalService.getCurrentUser().userType == 'Admin') {
      return true;
    } else {
      alert('Login required to access the page.');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
