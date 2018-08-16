import { Component, OnInit } from '@angular/core';
import {NewsService} from "./news.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  private title: string;
  private file: File;
  private success = false;
  private message: string;

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  hide() {
    this.success = false;
  }

  publish() {
    const formData = new FormData();
    formData.append("title", this.title);
    formData.append('file', this.file, this.file.name);

    console.log(formData.get('title'));
    this.newsService.postNews(formData).subscribe(data => {
      this.success = true;
      this.message = "Новость опубликована";
    });
  }
}
