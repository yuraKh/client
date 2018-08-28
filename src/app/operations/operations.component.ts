import {Component, OnInit} from '@angular/core';
import {Operation} from './operation.model';
import {UserService} from '../user/user.service';
import {AuthenticationService} from '../_services';
import {ActivatedRoute} from '@angular/router';
import {User} from '../user/user.model';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  operations: Operation[] = [];
  page = 0;
  id: number;
  user: User;


  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUser(this.id).subscribe(data => {
      this.user = data;
    });
    this.userService.getUserOperations(this.id, this.page).subscribe(data => {
      this.operations = data;
    });
  }


  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }

  onScrollOperations() {
    this.page = this.page + 1;
    this.userService.getUserOperations(this.id, this.page).subscribe(data => {
      if (data !== undefined) {
        // @ts-ignore
        data.forEach(item => {
          this.operations.push(new Operation(item));
        });
        // this.admins = data;
      }
    });
  }


}
