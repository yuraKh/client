import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>('https://s4.rprc05.ru:8036/api/v1/security/email', { email: username, password: password })
            .pipe(map((res:any) => {
                // login successful if there's a jwt token in the response
                if (res && res.token) {
                    console.log(res, res.token);
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username, token: res.token }));
                }
            }));
    }


    signup(username: string, password: string, email: string) {
        return this.http.post<any>('/api/auth/signup', { username: username, password: password, email: email })
        .pipe(map((res:any) => {
            console.log(res);
        }));
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    isAuthenticated() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            return true;
        }
        return false;
    }
}