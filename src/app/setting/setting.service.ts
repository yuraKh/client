import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private modeUrl = 'https://s4.rprc05.ru:8036/api/v1/admins/workmode';
  private maxLimitUrl = 'https://s4.rprc05.ru:8036/api/v1/admins/limits/max';
  private minLimitUrl = 'https://s4.rprc05.ru:8036/api/v1/admins/limits/min';
  private cardLimitUrl = 'https://s4.rprc05.ru:8036/api/v1/admins/limits/card';
  private setInterestRateUrl = 'https://s4.rprc05.ru:8036/api/v1/admins/services';
  private getServicesUrl = 'https://s4.rprc05.ru:8036/api/v1/services';

  constructor(private http: HttpClient) { }

    setMode(id: number): Observable<any> {
        let params = new HttpParams();
        params.append('mode', id.toString());
        return this.http.put(`${this.modeUrl}/{mode}?mode=${id}`,{
            "message": "string"
        });
    }

    setMaxLimit(limit: number): Observable<any> {
      return this.http.post(`${this.maxLimitUrl}/${limit}`, null);
    }

    setMinLimit(limit: number): Observable<any> {
        return this.http.post(`${this.minLimitUrl}/${limit}`, null);
    }

    setCardLimit(limit: number): Observable<any> {
        return this.http.post(`${this.cardLimitUrl}/${limit}`, null);
    }

    setInterestRate(id: number, value: number): Observable<any> {
        return this.http.post(`${this.setInterestRateUrl}/${id}/interest-rate`, {"value": value});
    }

    getServices(): Observable<any> {
      return this.http.get(this.getServicesUrl);
    }
}
