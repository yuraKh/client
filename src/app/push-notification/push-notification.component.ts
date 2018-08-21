import {Component, OnInit} from '@angular/core';
import {NotificationService} from './notification.service';
import {Message} from './message.model';
import {UserService} from '../user/user.service';
import {User} from '../user/user.model';
import {Service} from '../setting/service.model';
import {SettingService} from '../setting/setting.service';
import {FormControl} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.css']
})
export class PushNotificationComponent implements OnInit {


  title: string;
  message: string;

  saldo: number;
  servId: number;
  successMes: string;
  selectedOption: string;
  errors: string;

  success = false;
  hideSelectUser = true;
  error = false;

  mes: Message = new Message();
  serviceList: Service[] = [];
  user: User;
  results: User[] = [];
  queryField: FormControl = new FormControl();

  options = [
    {name: 'Всем пользователям', value: 1},
    {name: 'Пользователю по ID', value: 2}
  ];
  maintenanceMode = false;

  constructor(private notificationService: NotificationService,
              private userService: UserService,
              private settingService: SettingService) {
  }

  ngOnInit() {
    this.queryField.valueChanges
      .subscribe(queryField => {
        if (queryField.length >= 3) {
          console.log(queryField);
          this.userService.searchUser(queryField).subscribe(response => {
            this.results = response;
          }, (error: HttpErrorResponse) => {
            if (error.status === 503) {
              this.maintenanceMode = true;
            }
          });
        } else {
          this.init();
        }
      });
    this.settingService.getServices().subscribe(data => {
        this.serviceList = data;
        this.maintenanceMode = false;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 503) {
          this.maintenanceMode = true;
        }
      });
  }

  init() {
    this.results = [];
  }

  selectUser(user: User) {
    this.user = user;
    this.results = [];
    this.queryField.setValue('');
  }

  onChange(event: any) {
    this.hideSelectUser = event !== this.options[1].name;
  }

  getService(event: any) {
    this.serviceList.forEach(() => {
      switch (event) {
        case 'Газ':
          this.servId = 1;
          break;
        case  'Электроэнергия':
          this.servId = 2;
          break;
        case 'Вывоз ТБО':
          this.servId = 3;
          break;
        case 'Капитальный Ремонт':
          this.servId = 4;
          break;
      }
    });
  }

  sendSaldo() {
    this.notificationService.sendrArears(this.servId, this.saldo).subscribe(data => {
        this.saldo = 0;
        this.success = true;
        this.successMes = data.message;
        this.maintenanceMode = false;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 503) {
          this.maintenanceMode = true;
        } else {
          this.errors = error.error.message;
          this.error = true;
        }
      });
  }

  hide() {
    this.success = false;
  }

  hideE() {
    this.error = false;
  }

  send() {
    const o = this.options.find(x => x.name === this.selectedOption);
    this.mes.title = this.title;
    this.mes.message = this.message;
    if (o === this.options[0]) {
      this.notificationService.sendAll(this.mes).subscribe(
        data => {
          this.success = true;
          this.successMes = data.message;
          this.title = null;
          this.message = null;
          this.maintenanceMode = false;
        },
        (error: HttpErrorResponse) => {
          if (error.status === 503) {
            this.maintenanceMode = true;
          } else {
            this.errors = 'Не выбран пользователь';
            this.error = true;
          }
        });
      console.log(o.value);
    } else {
      this.notificationService.sendUser(this.user.id, this.mes).subscribe(
        data => {
          this.success = true;
          this.successMes = data.message;
          this.title = null;
          this.message = null;
          this.maintenanceMode = false;
        },
        (error: HttpErrorResponse) => {
          if (error.status === 503) {
            this.maintenanceMode = true;
          } else {
            this.errors = error.error.message;
            this.error = true;
          }
        });
    }
  }
}
