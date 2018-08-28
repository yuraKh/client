import {Component, OnInit} from '@angular/core';
import {CommonService} from "../_services/common.service";

@Component({
  selector: 'app-mode',
  templateUrl: './mode.component.html',
  styleUrls: ['./mode.component.css']
})
export class ModeComponent implements OnInit {

  maintenanceMode = false;

  constructor(
    private commonService: CommonService) {
    this.commonService.updateListsObs.subscribe(data => {
      this.maintenanceMode = data;
    });

  }

  ngOnInit() {
  }

}
