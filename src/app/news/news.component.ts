import {Component, OnInit} from '@angular/core';
import {NewsService} from './news.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  title: string;
  file: File;
  success = false;
  message: string;
  errors = false;

  maintenanceMode = false;

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  hideE() {
    this.errors = false;
  }

  hide() {
    this.success = false;
  }

  publish() {
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('file', this.file, this.file.name);

    console.log(formData.get('title'));
    this.newsService.postNews(formData).subscribe(data => {
        this.success = true;
        this.message = 'Новость опубликована';
        this.title = null;
        this.file = null;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 503) {
          this.maintenanceMode = true;
        } else {
          this.message = error.error.message;
          this.errors = true;
        }
      });
  }
}
