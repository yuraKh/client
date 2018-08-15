import {Component, OnInit} from '@angular/core';
import {AdminsService} from './admins.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Admin} from "./admins.model";
import {AuthenticationService} from "../_services";

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
    adminForm: FormGroup;
    admins: Admin[] = [];
    page: number = 0;
    isShowing = false;
    submitted = false;
    error = '';


    constructor(private adminsService: AdminsService,
                private formBuilder: FormBuilder,
                private authenticationService: AuthenticationService
    ) {
    }

    ngOnInit() {
        this.page = 0;
        this.admins = [];
        this.adminForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.loadAll(this.page);
    }

    loadAll(page: number) {
        this.adminsService.getAll(page).subscribe((data) => this.onSuccess(data));
    }

    // @ts-ignore
    onSuccess(data) {
        console.log(data);
        if (data != undefined) {
            // @ts-ignore
            data.forEach(item => {
                this.admins.push(new Admin(item));
            });
            // this.admins = data;
        }
    }

    onScroll()
    {
        console.log("Scrolled");
        this.page = this.page + 1;
        this.loadAll(this.page);
    }

    clearForm() {
        this.adminForm.reset();
        this.isShowing = false;
    }
    deleteAdmin(id: number) {
      // const admin = this.admins.find(x => x.email == email);
      this.adminsService.deleteAdmin(id).subscribe(data => {
          this.ngOnInit();
      });
    }

    blockAdmin(id: number) {
        this.adminsService.blockAdmin(id).subscribe(data => {
            this.ngOnInit();
        });
    }

    get f() {
        return this.adminForm.controls;
    }

    saveAdmin() {
        this.submitted = true;
        if (this.adminForm.invalid) {
            return;
        }
        this.adminsService.saveAdmin(this.f.email.value, this.f.password.value).subscribe(
            data => {
                this.isShowing = false;
                this.ngOnInit();
            },
            error => {
                console.log(error);
                this.error = error.error.message;
            });
    }

    isAuthenticated() {
        return this.authenticationService.isAuthenticated();
    }
}
