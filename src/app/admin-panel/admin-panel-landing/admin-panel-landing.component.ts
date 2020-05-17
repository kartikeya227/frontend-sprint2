import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../Service/global.service';

@Component({
  selector: 'app-admin-panel-landing',
  templateUrl: './admin-panel-landing.component.html',
  styleUrls: ['./admin-panel-landing.component.css']
})
export class AdminPanelLandingComponent implements OnInit {

  name: string;

  constructor(private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.name = this.globalService.getCurrentUser().userName;
  }

}
