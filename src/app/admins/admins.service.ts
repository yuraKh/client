import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  private getAdminsUrl = '/api/v1/admins';
  private createAdminUrl = '/api/v1/admins';
  private deleteUrl = '/api/v1/admins';
  private blockUrl = '/api/v1/admins';

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
    .pipe(map((res: any) => {
      console.log(res);
  }));
  }
}
