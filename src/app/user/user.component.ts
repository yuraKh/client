import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {User} from './user.model';
import {AuthenticationService} from '../_services';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  u: User = new User();
  page = 0;

  userDetail = 'none'; // default Variable
  maintenanceMode = false;

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.users = [];
    this.page = 0;
    this.loadAll(this.page);
  }

  openModalDialog(id: number) {
    this.userService.getUser(id).subscribe(data => {
        this.u = data;
        this.userDetail = 'block';
      },
      (error: HttpErrorResponse) => {
        if (error.status === 503) {
          this.maintenanceMode = true;
        }
      });
  }

  closeModalDialog() {
    this.userDetail = 'none'; // set none css after close dialog
  }

  loadAll(page: number) {
    this.userService.getAll(page).subscribe((data) => {
        this.onSuccess(data);
        this.maintenanceMode = false;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 503) {
          this.maintenanceMode = true;
        }
      });
  }

  // @ts-ignore
  onSuccess(data) {
    console.log(data);
    if (data !== undefined) {
      // @ts-ignore
      data.forEach(item => {
        this.users.push(new User(item));
      });
      // this.admins = data;
    }
  }

  onScroll() {
    console.log('Scrolled');
    this.page = this.page + 1;
    this.loadAll(this.page);
  }


  resetPassword(id: number) {
    // const admin = this.admins.find(x => x.email == email);
    this.userService.resetPassword(id).subscribe(data => {
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        if (error.status === 503) {
          this.maintenanceMode = true;
        }
      });
  }

  blockUser(id: number) {
    this.userService.blockUser(id).subscribe(data => {
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        if (error.status === 503) {
          this.maintenanceMode = true;
        }
      });
  }

  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }
}
