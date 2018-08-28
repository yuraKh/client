import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {User} from './user.model';
import {AuthenticationService} from '../_services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  u: User = new User();
  page = 0;

  userDetail = 'none';


  // default Variable

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService) {
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
    });
  }

  closeModalDialog() {
    this.userDetail = 'none'; // set none css after close dialog
  }

  loadAll(page: number) {
    this.userService.getAll(page).subscribe((data) => this.onSuccess(data));
  }

  // @ts-ignore
  onSuccess(data) {
    if (data !== undefined) {
      // @ts-ignore
      data.forEach(item => {
        if(!this.users.includes(item)) {
          this.users.push(item);
        }
      });
      // this.admins = data;
    }
  }

  onScroll() {
    this.page = this.page + 1;
    this.loadAll(this.page);
  }


  resetPassword(id: number) {
    this.userService.resetPassword(id).subscribe(data => {
      this.replaceUser(id);
    });
  }

  replaceUser(id: number) {
    const user = this.users.find(x => x.id == id);
    const index = this.users.indexOf(user);
    this.userService.getAll(index/10 >> 0).subscribe(data => {
      let update = data.find(x => x.id == id);
      this.users[index] = update;
    });
  }

  blockUser(id: number) {
    this.userService.blockUser(id).subscribe(data => {
      this.replaceUser(id);
    });
  }

  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }
}
