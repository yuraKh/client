import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  private getAdminsUrl = 'https://s4.rprc05.ru:8036/api/v1/admins';
  private createAdminUrl = 'https://s4.rprc05.ru:8036/api/v1/admins';
  private deleteUrl = 'https://s4.rprc05.ru:8036/api/v1/admins';
  private blockUrl = 'https://s4.rprc05.ru:8036/api/v1/admins';

  constructor(private http: HttpClient) { }

  getAll(page: number): Observable<any> {
    return this.http.get(`${this.getAdminsUrl}?page=${page}&count=10`);
  }

  deleteAdmin(id: number): Observable<any> {
    return this.http.delete(`${this.deleteUrl}/${id}`);
  }

  blockAdmin(id: number): Observable<any> {
    return this.http.patch(`${this.blockUrl}/${id}`, null);
  }

  saveAdmin(email: string, password: string) {
    return this.http.post(this.createAdminUrl, {email: email, password: password})
    .pipe(map((res:any) => {
      console.log(res);
  }));
  }
  
}
