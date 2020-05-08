import {Component, Input, OnInit} from '@angular/core';
import {Users} from '../Model/users';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../Service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: Users;
  err: any;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
      this.user = new Users();
  }

  onSubmit(){

    this.userService.addUser(this.user).subscribe(data => {
      this.goToSuccess();
    }, error => { console.log('opps', error );
                      });

    }
  goToSuccess(){
    this.router.navigate(['/signupsuccess']);
  }

  ngOnInit(): void {
  }

}
