import { Component, OnInit } from '@angular/core';
import {Users} from '../Model/users';
import {UserService} from '../Service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalService} from '../Service/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users: Users[];
  currentUser: Users;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private globalService: GlobalService) {
    this.currentUser = new Users();
  }

  onSubmit(){
    let i = 0;
    this.users.forEach(value => {
      const name = value.userName;
      const password = value.userPassword;
      if (name == this.currentUser.userName && password == this.currentUser.userPassword){
          if (value.userType == 'Admin'){
            this.router.navigate(['/adminpanel']);
            this.globalService.setCurrentUser(value);
            i = 1;
          }
          else if (value.userType == 'User'){
            this.router.navigate(['/userpanel']);
            this.globalService.setCurrentUser(value);
            i = 1;
          }
      }
    });
    if (i == 0){
      alert('Invalid username or password!');
    }
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

}
