import {Component, ElementRef, OnInit} from '@angular/core';
import {NewsService} from './news.service';
import { ViewChild } from '@angular/core';

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

  @ViewChild('myInput')
  myInputVariable: ElementRef;

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
  }

  reset() {
    console.log(this.myInputVariable.nativeElement.files);
    this.myInputVariable.nativeElement.value = '';
    console.log(this.myInputVariable.nativeElement.files);
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

    this.newsService.postNews(formData).subscribe(data => {
        this.errors = false;
        this.success = true;
        this.message = 'Новость опубликована';
        this.title = null;
        this.file = null;
        this.reset();
      },
      error => {
        this.message = error.error.message;
        this.success = false;
        this.errors = true;
        this.file = null;
        this.reset();
      });
  }
}
