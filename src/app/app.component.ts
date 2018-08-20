import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './_services';

@Component({
  selector: 'app-client',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
    ngOnInit() {
    }

    constructor (private authenticationService: AuthenticationService) {}

    isAuthenticated() {
        return this.authenticationService.isAuthenticated();
    }
}
