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

    selectedOption: string;

    maxLimit: number;
    minLimit: number;
    cardLimit: number;

    serviceList: Service[] = [];
    selectedService: string;
    interestRate: number;

    options = [
        {name: "Обычный режим", value: 1},
        {name: "Режим обслуживания", value: 2}
    ]

    constructor(private settingService: SettingService,
                private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.settingService.getServices().subscribe(data => {
            this.serviceList = data;
            console.log(this.serviceList);
        });
    }

    setMode() {
        const o = this.options.find(x => x.name == this.selectedOption);
        this.settingService.setMode(o.value).subscribe(
            data => {
                this.ngOnInit();
            },
            error => {
                console.log(error.error.message);
            });
        console.log(o.value);
    }

    setMaxLimit() {
        this.settingService.setMaxLimit(this.maxLimit).subscribe(
            data => {
                console.log(data)
            });
    }

    setMinLimit() {
        this.settingService.setMinLimit(this.minLimit).subscribe(
            data => {
                console.log(data)
            });
    }

    setCardLimit() {
        this.settingService.setCardLimit(this.cardLimit).subscribe(
            data => {
                console.log(data)
            });
    }

    saveInterestRate() {
        const o = this.serviceList.find(x => x.name == this.selectedService);
        this.settingService.setInterestRate(o.id, this.interestRate).subscribe(
            data => {
                console.log(data)
            });
    }

    isAuthenticated() {
        return this.authenticationService.isAuthenticated();
    }
}
