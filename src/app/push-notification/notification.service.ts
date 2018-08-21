import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from './message.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private pushUserUrl = '/api/v1/admins/push/individual/users';
  private pushAllUrl = '/api/v1/admins/push/administration';
  private arearsUrl = '/api/v1/admins/push/arrears/services';

  constructor(private http: HttpClient) { }

  sendAll(message: Message): Observable<any> {
    return this.http.post(this.pushAllUrl, message);
  }

  sendUser(id: number, message: Message): Observable<any> {
    return this.http.post(`${this.pushUserUrl}/${id}`,  message);
  }

  sendrArears (id: number, saldo: number): Observable<any> {
    return this.http.post(`${this.arearsUrl}/${id}/${saldo}`,  null);
  }
}
