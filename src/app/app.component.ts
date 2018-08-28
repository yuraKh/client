import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './_services';
import {SettingService} from "./setting/setting.service";
import {CommonService} from "./_services/common.service";
import {Spinkit} from 'ng-http-loader';

@Component({
    selector: 'app-client',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
  public spinkit = Spinkit;

    ngOnInit() {
this.spinkit.skWave;
      this.settingService.getWorkMode().subscribe(mode => {
        if (mode.id === 2) {
          this.commonService.updateListFn(true);
        } else {
          this.commonService.updateListFn(false);
        }
      });

    }

    constructor (private authenticationService: AuthenticationService,
                 private settingService: SettingService,
                 private commonService: CommonService) {}

    isAuthenticated() {
        return this.authenticationService.isAuthenticated();
    }
}
