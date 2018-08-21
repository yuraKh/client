import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Response} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private modeUrl = 'https://s4.rprc05.ru:8036/api/v1/admins/workmode';
  private maxLimitUrl = 'https://s4.rprc05.ru:8036/api/v1/admins/limits/max';
  private minLimitUrl = 'https://s4.rprc05.ru:8036/api/v1/admins/limits/min';
  private cardLimitUrl = 'https://s4.rprc05.ru:8036/api/v1/admins/limits/card';
  private interestRateUrl = 'https://s4.rprc05.ru:8036/api/v1/admins/services';
  private getServicesUrl = 'https://s4.rprc05.ru:8036/api/v1/services';

  private getLimitsUrl = 'https://s4.rprc05.ru:8036/api/v1/payments/limits';

  constructor(private http: HttpClient) {
  }

  setMode(id: number): Observable<any> {
    return this.http.put(`${this.modeUrl}/{mode}?mode=${id}`, {
      'message': 'string'
    });
  }

  setMaxLimit(limit: number): Observable<any> {
    return this.http.post(`${this.maxLimitUrl}/${limit}`, null);
  }

  getMaxLimit(): Observable<any> {
    return this.http.get(`${this.getLimitsUrl}/max`);
  }

  setMinLimit(limit: number): Observable<any> {
    return this.http.post(`${this.minLimitUrl}/${limit}`, null);
  }

  getMinLimit(): Observable<any> {
    return this.http.get(`${this.getLimitsUrl}/min`);
  }

  setCardLimit(limit: number): Observable<any> {
    return this.http.post(`${this.cardLimitUrl}/${limit}`, null);
  }

  getCardLimit(): Observable<any> {
    return this.http.get(`${this.getLimitsUrl}/card`);
  }

  setInterestRate(id: number, value: number): Observable<any> {
    return this.http.post(`${this.interestRateUrl}/${id}/interest-rate`, {'value': value});
  }

  getInterestRate(id: number): Observable<any> {
    return this.http.get(`${this.interestRateUrl}/${id}/interest-rate`);
  }

  getServices(): Observable<any> {
    return this.http.get(this.getServicesUrl).pipe(map((res: Response) => {
    }));
  }
}
