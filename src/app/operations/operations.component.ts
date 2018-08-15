import { Component, OnInit } from '@angular/core';
import {Operation} from "./operation.model";
import {UserService} from "../user/user.service";
import {AuthenticationService} from "../_services";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  private operations: Operation[] = [];
  private page: number = 0;
  private id: number;

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute) { }

  ngOnInit() {
      this.id = this.route.snapshot.params['id'];
      this.userService.getUserOperations(this.id, this.page).subscribe(data => {
        this.operations = data;
      })
  }


    isAuthenticated() {
        return this.authenticationService.isAuthenticated();
    }

    onScrollOperations() {
        this.page = this.page + 1;
        this.userService.getUserOperations(this.id, this.page).subscribe(data => {
            if (data != undefined) {
                // @ts-ignore
                data.forEach(item => {
                    this.operations.push(new Operation(item));
                });
                // this.admins = data;
            }
        });
    }


}
