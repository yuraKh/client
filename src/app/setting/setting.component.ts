import {Component, OnInit} from '@angular/core';
import {SettingService} from './setting.service';
import {Service} from './service.model';
import {AuthenticationService} from '../_services';
import {CommonService} from "../_services/common.service";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  selectedOption: string;

  maxLimit: number;
  minLimit: number;
  cardLimit: number;
  message: string;
  onSuccess = false;
  serviceList: Service[] = [];
  selectedService: string;
  interestRate: number;



  options = [
    {name: 'Обычный режим', value: 1},
    {name: 'Режим обслуживания', value: 2}
  ];

  constructor(private settingService: SettingService,
              private authenticationService: AuthenticationService,
              private commonService: CommonService) {
  }

  ngOnInit() {
    this.settingService.getWorkMode().subscribe(mode => {
      if (mode.id === 2) {
        this.commonService.updateListFn(true);
      } else {
        this.commonService.updateListFn(false);
      }
    });
    this.settingService.getServices().subscribe(data => {
      this.serviceList = data;
    });
    this.init();
  }


  init() {
    this.settingService.getMaxLimit().subscribe((data) => this.maxLimit = data.value);
    this.settingService.getMinLimit().subscribe((data) => this.minLimit = data.value);
    this.settingService.getCardLimit().subscribe((data) => this.cardLimit = data.value);
  }

  setMode() {
    const o = this.options.find(x => x.name === this.selectedOption);
    if (o.value === 1) {
      this.settingService.setMode(o.value, 'Сервис в режиме обслуживания').subscribe(data => {
        this.onSuccess = true;
        this.message = 'Режим работы изменен на: ' + this.selectedOption;
        this.commonService.updateListFn(false);
      });
    } else {
      this.settingService.setMode(o.value, 'Сервис активен').subscribe(data => {
        this.onSuccess = true;
        this.message = 'Режим работы изменен на: ' + this.selectedOption;
        this.commonService.updateListFn(true);
      });
    }
  }

  setMaxLimit() {
    this.settingService.setMaxLimit(this.maxLimit).subscribe(
      data => {
        this.onSuccess = true;
        this.message = 'Максимальное значение общей сумы платежа успешно изменено';
        this.ngOnInit();
      });
  }

  hide() {
    this.onSuccess = false;
  }

  setMinLimit() {
    this.settingService.setMinLimit(this.minLimit).subscribe(
      data => {
        this.onSuccess = true;
        this.message = 'Минимальное значение общей сумы платежа успешно изменено';
      });
  }

  setCardLimit() {
    this.settingService.setCardLimit(this.cardLimit).subscribe(
      data => {
        this.onSuccess = true;
        this.message = 'Минимальная сума платежа с банковской карты успешно изменено';
      });
  }

  saveInterestRate() {
    const o = this.serviceList.find(x => x.name === this.selectedService);
    this.settingService.setInterestRate(o.id, this.interestRate).subscribe(
      data => {
        this.onSuccess = true;
        this.message = 'Процентная ставка для услуги ' + this.selectedService + ' успешно изменено';
      });
  }

  getInterestRate(event: any) {
    let id;
    this.serviceList.forEach(item => {
      switch (event) {
        case 'Газ':
          id = 1;
          break;
        case  'Электроэнергия':
          id = 2;
          break;
        case 'Вывоз ТБО':
          id = 3;
          break;
        case 'Капитальный Ремонт':
          id = 4;
          break;
      }
    });
    this.settingService.getInterestRate(id).subscribe(data => {
      this.interestRate = data.value;
    });
  }

  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }
}
