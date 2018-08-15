import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from "../_services";
;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

    isAuthenticated() {
        return this.authenticationService.isAuthenticated();
    }


    logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

}
