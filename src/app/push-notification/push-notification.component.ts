import { Component, OnInit } from '@angular/core';
import {NotificationService} from "./notification.service";
import {Message} from "./message.model";
import {UserService} from "../user/user.service";
import {User} from "../user/user.model";
import {Service} from "../setting/service.model";
import {SettingService} from "../setting/setting.service";

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.css']
})
export class PushNotificationComponent implements OnInit {

   title: string;
   message: string;
   mes: Message = new Message();
   saldo: number;
   servId: number;
  successMes: string;
  selectedOption: string;
  success = false;
  hideSelectUser = true;
  options = [
    {name: "Всем пользователям", value: 1},
    {name: "Пользователю по ID", value: 2}
  ];
  error = false;
  errors: string;
  users: User[] = [];
  userId: number;
  page: number = 0;

  serviceList: Service[] = [];

  userDetail='none'; //default Variable

  constructor(private notificationService: NotificationService,
              private userService: UserService,
              private settingService: SettingService) { }

  ngOnInit() {
    this.settingService.getServices().subscribe(data => {
      this.serviceList = data;
      console.log(this.serviceList);
    });
  }

  onChange(event: any){
    if(event == this.options[1].name){
      this.hideSelectUser = false;

    }else {
      this.userId = 1;
      this.hideSelectUser = true;
    }
  }

  getService(event: any) {
    this.serviceList.forEach(item => {
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
    console.log(this.servId);
  }

  sendSaldo(){
     this.notificationService.sendrArears(this.servId, this.saldo).subscribe(data => {
      this.saldo = 0;
      this.servId = 0;
       this.success = true;
       this.successMes = data.message;
    },
       e => {
         this.errors = e.error.message;
         this.error = true;
       });
  }

  hide() {
    this.success = false;
  }

  hideE() {
    this.error = false;
  }

  send() {
    const o = this.options.find(x => x.name == this.selectedOption);
    this.mes.title = this.title;
    this.mes.message = this.message;
    if(o == this.options[0]) {
      this.notificationService.sendAll(this.mes).subscribe(
        data => {
          this.success = true;
          this.successMes = data.message;
          this.userId = null;

        },
        error => {
          console.log(error.error.message);
        });
      console.log(o.value);
    }
    else {
      this.notificationService.sendUser(this.userId, this.mes).subscribe(
          data => {
            this.success = true;
            this.successMes = data.message;
            this.userId = null;
          },
          error => {
            console.log(error.error.message);
          });
      console.log(o.value);
    }
  }

  openModalDialog(){
    this.userService.getAll(0).subscribe(data => {
      this.users = data;
      this.userDetail='block';
    });
  }

  closeModalDialog(){
    this.userDetail='none';
  }

  selectUser(id: number) {
    console.log(id);
    this.userId = id;
    this.closeModalDialog();
  }

  loadAll(page: number) {
    this.userService.getAll(page).subscribe((data) => this.onSuccess(data));
  }

  // @ts-ignore
  onSuccess(data) {
    console.log(data);
    if (data != undefined) {
      // @ts-ignore
      data.forEach(item => {
        this.users.push(new User(item));
      });
      // this.admins = data;
    }
  }

  onScroll() {
    console.log("Scrolled");
    this.page = this.page + 1;
    this.loadAll(this.page);
  }
}
