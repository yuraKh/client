import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AuthGuard } from './_guards';
import {JwtInterceptor} from './_helpers';
import { AuthenticationService } from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AdminsComponent } from './admins/admins.component'
import { AdminsService } from './admins/admins.service';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component'
import { MenuComponent } from './menu/menu.component';
import { SettingComponent } from './setting/setting.component';
import {FormsModule} from '@angular/forms';;
import { UserComponent } from './user/user.component'
import {UserService} from "./user/user.service";;
import { OperationsComponent } from './operations/operations.component';;
import { AccountComponent } from './account/account.component'

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        InfiniteScrollModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        AdminsComponent ,
        NavbarComponent ,
        SignupComponent,
        MenuComponent,
        SettingComponent,
        UserComponent
,
        OperationsComponent ,
        AccountComponent   ],
    providers: [
        AuthGuard,
        AuthenticationService,
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        AdminsService
        // provider used to create fake backend
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }