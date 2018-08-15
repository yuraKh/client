import {Component, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {User} from "./user.model";
import {Operation} from "../operations/operation.model";
import {AuthenticationService} from "../_services";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    users: User[] = [];
    u: User = new User();
    page: number = 0;

    userDetail='none'; //default Variable

    constructor(private userService: UserService,
                private authenticationService: AuthenticationService
    ) {
    }

    ngOnInit() {
        this.users = [];
        this.page = 0;
        this.loadAll(this.page);
    }

    openModalDialog(id: number){
        this.userService.getUser(id).subscribe(data => {
            this.u = data;
            this.userDetail='block';
        });
    }

    closeModalDialog(){
        this.userDetail='none'; //set none css after close dialog
    }

    loadAll(page: number) {
        this.userService.getAll(page).subscribe((data) => this.onSuccess(data));
    }

    // @ts-ignore
    onSuccess(data) {
        console.log(data);
        if (data != undefined) {
            // @ts-ignore
            data.forEach(item => {
                this.users.push(new User(item));
            });
            // this.admins = data;
        }
    }

    onScroll() {
        console.log("Scrolled");
        this.page = this.page + 1;
        this.loadAll(this.page);
    }


    resetPassword(id: number) {
        // const admin = this.admins.find(x => x.email == email);
        this.userService.resetPassword(id).subscribe(data => {
            this.ngOnInit();
        });
    }

    blockUser(id: number) {
        this.userService.blockUser(id).subscribe(data => {
            this.ngOnInit();
        });
    }

    isAuthenticated() {
        return this.authenticationService.isAuthenticated();
    }
}
