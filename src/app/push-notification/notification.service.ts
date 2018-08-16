import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from "./message.model";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private pushUserUrl = 'https://s4.rprc05.ru:8036/api/v1/admins/push/individual/users';
  private pushAllUrl = 'https://s4.rprc05.ru:8036/api/v1/admins/push/administration';
  private arearsUrl = 'https://s4.rprc05.ru:8036/api/v1/admins/push/arrears/services';

  constructor(private http: HttpClient) { }

  sendAll(message: Message): Observable<any> {
    return this.http.post(this.pushAllUrl, message);
  }

  sendUser(id:number, message: Message): Observable<any> {
    return this.http.post(`${this.pushUserUrl}/${id}`,  message);
  }

  sendrArears (id:number, saldo: number): Observable<any> {
    return this.http.post(`${this.arearsUrl}/${id}/${saldo}`,  null);
  }
}
