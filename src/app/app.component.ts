import { Component } from '@angular/core';
import {OnInit} from '@angular/core';
import {AuthenticationService} from "./_services";

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit{
    ngOnInit() {
    }

    constructor (private authenticationService: AuthenticationService){}

    isAuthenticated() {
        return this.authenticationService.isAuthenticated();
    }
}