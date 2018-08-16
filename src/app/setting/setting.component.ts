import { Component, OnInit } from '@angular/core';
import {SettingService} from "./setting.service";
import {Service} from "./service.model";
import {AuthenticationService} from "../_services";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  private selectedOption: string;

  private maxLimit: number;
  private minLimit: number;
  private cardLimit: number;
  message: string;
  maxLimitSuccess = false;

  serviceList: Service[] = [];
  selectedService: string;
  interestRate: number;

  options = [
    {name: "Обычный режим", value: 1},
    {name: "Режим обслуживания", value: 2}
  ];

  constructor(private settingService: SettingService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.settingService.getServices().subscribe(data => {
      this.serviceList = data;
      console.log(this.serviceList);
    });
    this.init();
  }

  init() {
    this.settingService.getMaxLimit().subscribe((data) => this.maxLimit = data.value);
    this.settingService.getMinLimit().subscribe((data) => this.minLimit = data.value);
    this.settingService.getCardLimit().subscribe((data) => this.cardLimit = data.value);
  }

  setMode() {
    const o = this.options.find(x => x.name == this.selectedOption);
    this.settingService.setMode(o.value).subscribe(
      data => {
        this.maxLimitSuccess = true;
        this.message = 'Режим работы изменен на: ' + this.selectedOption;
        //this.ngOnInit();
      },
      error => {
        console.log(error.error.message);
      });
    console.log(o.value);
  }

  setMaxLimit() {
    this.settingService.setMaxLimit(this.maxLimit).subscribe(
      data => {
        this.maxLimitSuccess = true;
        this.message = 'Максимальное значение общей сумы платежа успешно изменено';
        console.log(data);
        this.ngOnInit();
      });
  }

  hide() {
    this.maxLimitSuccess = false;
  }

  setMinLimit() {
    this.settingService.setMinLimit(this.minLimit).subscribe(
      data => {
        this.maxLimitSuccess = true;
        this.message = 'Минимальное значение общей сумы платежа успешно изменено';
        console.log(data)
      });
  }

  setCardLimit() {
    this.settingService.setCardLimit(this.cardLimit).subscribe(
      data => {
        this.maxLimitSuccess = true;
        this.message = 'Минимальная сума платежа с банковской карты успешно изменено';
        console.log(data)
      });
  }

  saveInterestRate() {
    let o = this.serviceList.find(x => x.name == this.selectedService);
    this.settingService.setInterestRate(o.id, this.interestRate).subscribe(
      data => {
        this.maxLimitSuccess = true;
        this.message = 'Процентная ставка для услуги ' + this.selectedService + ' успешно изменено';
        console.log(data)
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
    console.log(id);
    this.settingService.getInterestRate(id).subscribe(data => {
      this.interestRate = data.value;
    });
  }

  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }
}
