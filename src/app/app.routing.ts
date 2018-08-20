import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login';
import {AdminsComponent} from './admins/admins.component';
import {SignupComponent} from './signup/signup.component';
import {SettingComponent} from './setting/setting.component';
import {UserComponent} from './user/user.component';
import {OperationsComponent} from './operations/operations.component';
import {AccountComponent} from './account/account.component';
import {PushNotificationComponent} from './push-notification/push-notification.component';
import {NewsComponent} from './news/news.component';
import {LogsComponent} from './logs/logs.component';


const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'admins', component: AdminsComponent },
    { path: 'signup', component: SignupComponent},
    { path: 'setting', component: SettingComponent },
    { path: 'users', component: UserComponent },
    { path: 'users/:id/operations', component: OperationsComponent },
    { path: 'users/:id/accounts', component: AccountComponent },
    { path: 'notifications', component: PushNotificationComponent },
    { path: 'news', component: NewsComponent },
  {path: 'logs', component: LogsComponent},

  // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
