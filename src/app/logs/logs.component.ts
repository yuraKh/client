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

  userId: number;
  uzer: User;
  users: User[] = [];
  smsLogs: SmsLog[] = [];
  acquiringLogs: AcquiringLog[] = [];
  showSmsLogs = false;
  showAcquiringLogs = false;
  userDetail = 'none';
  username;

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
          this.userService.searchUser(queryField).subscribe(response => this.results = response);
        }
      });
  }

  init() {
    this.smsLogs = [];
    this.acquiringLogs = [];
    this.showAcquiringLogs = false;
    this.showSmsLogs = false;
    this.userId = null;
  }
  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }

  getSmsLogs() {
    this.showAcquiringLogs = false;
    this.showSmsLogs = true;
    this.closeModalDialog();
    this.logService.getSmsLogs(this.userId).subscribe(data => {
      this.smsLogs = data;
    });
  }

  getAcquiringLogs() {
    this.showAcquiringLogs = true;
    this.showSmsLogs = false;
    this.closeModalDialog();
    this.logService.getAcquiringLogs(this.userId).subscribe(data => {
      this.acquiringLogs = data;
    });
  }

  openModalDialog() {
    this.userService.searchUser(this.username).subscribe(data => {
      this.users = data;
      this.userDetail = 'block';
    });
  }

  closeModalDialog() {
    this.userDetail = 'none';
    this.username = null;
  }

  selectUser(user: User) {
    this.userId = user.id;
    this.uzer = user;
    this.results = null;
    this.queryField.reset();
    this.smsLogs = [];
    this.acquiringLogs = [];
  }

  search() {
    this.userService.getAll(0).subscribe(data => {
      this.users = data;
      this.openModalDialog();
    });
  }
}
