import {Component, OnInit} from '@angular/core';
import {AdminsService} from './admins.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Admin} from './admins.model';
import {AuthenticationService} from '../_services';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
  adminForm: FormGroup;
  admins: Admin[] = [];
  page = 0;
  isShowing = false;
  submitted = false;
  error = '';
  private last: boolean;



  constructor(private adminsService: AdminsService,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) {
  }

  get f() {
    return this.adminForm.controls;
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
    this.adminsService.getAll(page).subscribe((data) => {
      if (data.length === 0) {
        this.last = true;
      } else {
        this.last = false;
      }
      this.onSuccess(data)
    });
  }

  // @ts-ignore
  onSuccess(data) {
    if (data !== undefined) {
      // @ts-ignore
      data.forEach(item => {
        if(!this.admins.includes(item))
        this.admins.push(item);
      });
    }
  }

  onScroll() {
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
      this.replaceAdmin(id);
    });
  }

  blockAdmin(id: number) {
    this.adminsService.blockAdmin(id).subscribe(data => {
      this.replaceAdmin(id);
    });
  }

  replaceAdmin(id: number) {
    const admin = this.admins.find(x => x.id == id);
    const index = this.admins.indexOf(admin);
    this.adminsService.getAll(index/10 >> 0).subscribe(data => {
      let update = data.find(x => x.id == id);
      this.admins[index] = update;
    });
  }

  saveAdmin() {
    this.submitted = true;
    if (this.adminForm.invalid) {
      return;
    }
    this.adminsService.saveAdmin(this.f.email.value, this.f.password.value).subscribe(
      data => {
        this.isShowing = false;
        this.adminForm.reset();
        this.adminForm.clearValidators();
        this.submitted = false;
        if(this.last) {
          this.page = this.page - 1;
          this.adminsService.getAll(this.page).subscribe(data => {
              this.onSuccess(data);
          });
        }
      },
      error => {
        this.error = error.error.message;
      });
  }

  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }
}
