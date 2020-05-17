import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../Service/global.service';

@Component({
  selector: 'app-user-panel-landing',
  templateUrl: './user-panel-landing.component.html',
  styleUrls: ['./user-panel-landing.component.css']
})
export class UserPanelLandingComponent implements OnInit {

  name: string;

  constructor(private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.name = this.globalService.getCurrentUser().userName;
  }

}
