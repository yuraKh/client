import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../_services";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

    isAuthenticated() {
        return this.authenticationService.isAuthenticated();
    }

}
