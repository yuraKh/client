import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class UserService {

    private userBaseUrl = 'https://s4.rprc05.ru:8036/api/v1/admins/users';

    constructor(private http: HttpClient) { }

    getAll(page: number): Observable<any> {
        return this.http.get(`${this.userBaseUrl}?page=${page}&count=10`);
    }

    getUserOperations(id: number, page: number): Observable<any> {
        return this.http.get(`${this.userBaseUrl}/${id}/operations?page=${page}&count=10`);
    }

    getUserAccounts(id: number, page: number): Observable<any> {
        return this.http.get(`${this.userBaseUrl}/${id}/accounts?page=${page}&count=10`);
    }

    blockUser(id: number): Observable<any> {
        return this.http.patch(`${this.userBaseUrl}/${id}/blocked`, null);
    }

    resetPassword(id: number): Observable<any> {
        return this.http.patch(`${this.userBaseUrl}/${id}/password`, null);
    }

    getUser(id: number): Observable<any> {
        return this.http.get(`${this.userBaseUrl}/${id}`);
    }
}