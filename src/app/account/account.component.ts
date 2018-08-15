import {Component, OnInit} from '@angular/core';
import {UserService} from "../user/user.service";
import {AuthenticationService} from "../_services";
import {ActivatedRoute} from '@angular/router';
import {Account} from "./account.model";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

    private accounts: Account[] = [];
    private page: number = 0;
    private id: number;

    constructor(private userService: UserService,
                private authenticationService: AuthenticationService,
                private route: ActivatedRoute) { }

  ngOnInit() {
      this.id = this.route.snapshot.params['id'];
      this.userService.getUserAccounts(this.id, this.page).subscribe(data => {
          this.accounts = data;
      })
  }

    onScrollOperations() {
        this.page = this.page + 1;
        this.userService.getUserOperations(this.id, this.page).subscribe(data => {
            if (data != undefined) {
                // @ts-ignore
                data.forEach(item => {
                    this.accounts.push(new Account(item));
                });
            }
        });
    }

    isAuthenticated() {
        return this.authenticationService.isAuthenticated();
    }
}
