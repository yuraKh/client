import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private newsUrl = '/api/v1/admins/news';

  constructor(private http: HttpClient) { }

  postNews(formData: FormData): Observable<any> {
    return this.http.post(this.newsUrl, formData);
  }
}
