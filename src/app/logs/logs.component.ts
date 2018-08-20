import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../_services';
import {User} from '../user/user.model';
import {SmsLog} from './sms-log.model';
import {AcquiringLog} from './acquiring-log.model';
import {LogsService} from './logs.service';
import {UserService} from '../user/user.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  user: User;
  users: User[] = [];
  smsLogs: SmsLog[] = [];
  acquiringLogs: AcquiringLog[] = [];
  showSmsLogs = false;
  showAcquiringLogs = false;

  results: any[] = [];
  queryField: FormControl = new FormControl();

  constructor(private authenticationService: AuthenticationService,
              private logService: LogsService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.queryField.valueChanges
      .subscribe( queryField  => {
        if (queryField.length >= 3) {
          console.log(queryField);
          this.userService.searchUser(queryField).subscribe(response => this.results = response);
        } else {
          this.init();
        }
      });
  }

  init() {
    this.results = [];
    this.smsLogs = [];
    this.acquiringLogs = [];
    this.showAcquiringLogs = false;
    this.showSmsLogs = false;
  }
  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }

  getSmsLogs() {
    this.showAcquiringLogs = false;
    this.showSmsLogs = true;
    this.logService.getSmsLogs(this.user.id).subscribe(data => {
      this.smsLogs = data;
    });
  }

  getAcquiringLogs() {
    this.showAcquiringLogs = true;
    this.showSmsLogs = false;
    this.logService.getAcquiringLogs(this.user.id).subscribe(data => {
      this.acquiringLogs = data;
    });
  }


  selectUser(user: User) {
    console.log(user);
    this.user = user;
    this.results = [];
    this.queryField.setValue('');
    this.smsLogs = [];
    this.acquiringLogs = [];
  }

}
