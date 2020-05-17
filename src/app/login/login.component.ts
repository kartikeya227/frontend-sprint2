import {Component, OnInit, ViewChild} from '@angular/core';
import {Users} from '../Model/users';
import {UserService} from '../Service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalService} from '../Service/global.service';
import {LoginServiceService} from '../Service/login-service.service';
import {UserLogin} from '../Model/user-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users: Users[];
  currentUser: Users;
  userLogin: UserLogin;
  @ViewChild('loginForm') form: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private globalService: GlobalService,
              private loginService: LoginServiceService) {
    this.currentUser = new Users();
    this.userLogin = new UserLogin();
  }

  onSubmit(): void {
    this.userLogin.userName = this.currentUser.userName;
    this.userLogin.password = this.currentUser.userPassword;
    this.form.reset();
    this.loginService.userLogin(this.userLogin)
      .subscribe(value => {
        if (value != null) {
          this.globalService.setCurrentUser(value);
          this.globalService.setLoginStatus(true);
          if (value.userType == 'Admin') {
            this.router.navigate(['/adminpanel']);
          } else if (value.userType == 'User') {
            this.router.navigate(['/userpanel']);
            this.globalService.setCurrentUser(value);
          } else {
            this.globalService.setLoginStatus(false);
          }
        } else {
          this.globalService.setLoginStatus(false);
        }
      });
  }

  ngOnInit(): void {
  }

}
