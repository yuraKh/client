import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  private logUrl = '/api/v1/admins/users';

  constructor(private http: HttpClient) { }

  getSmsLogs (id: number): Observable<any> {
    return this.http.get(`${this.logUrl}/${id}/log/sms`);
  }

  getAcquiringLogs(id: number): Observable<any> {
    return this.http.get(`${this.logUrl}/${id}/log/acquiring`);
  }

}
