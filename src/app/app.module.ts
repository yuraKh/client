import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

import {AppComponent} from './app.component';
import {routing} from './app.routing';

import {AuthGuard} from './_guards';
import {JwtInterceptor} from './_helpers';
import {AuthenticationService} from './_services';
import {HomeComponent} from './home';
import {LoginComponent} from './login';
import {AdminsComponent} from './admins/admins.component';
import {AdminsService} from './admins/admins.service';
import {NavbarComponent} from './navbar/navbar.component';
import {MenuComponent} from './menu/menu.component';
import {SettingComponent} from './setting/setting.component';
import {UserComponent} from './user/user.component';
import {UserService} from './user/user.service';
import {OperationsComponent} from './operations/operations.component';
import {AccountComponent} from './account/account.component';
import {PushNotificationComponent} from './push-notification/push-notification.component';
import {NewsComponent} from './news/news.component';
import {LogsComponent} from './logs/logs.component';
import {NgHttpLoaderModule} from 'ng-http-loader';
import {ModeComponent} from './mode/mode.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        InfiniteScrollModule,
      NgHttpLoaderModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        AdminsComponent ,
        NavbarComponent ,
        MenuComponent,
        SettingComponent,
        UserComponent,
        OperationsComponent ,
        AccountComponent ,
        PushNotificationComponent ,
        NewsComponent ,
        LogsComponent,
        ModeComponent
    ],
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
