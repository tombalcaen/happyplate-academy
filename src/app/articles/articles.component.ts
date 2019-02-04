import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor(private _article: ArticleService) { }

  articles = [];

  ngOnInit() {
    this._article.getArticles().subscribe((articles)=>{      
      this.articles = articles;
      this.articles.push(articles[0])
      this.articles.push(articles[0])
      this.articles.push(articles[0])
      this.articles.push(articles[0])
      this.articles.push(articles[0])
      this.articles.push(articles[0])
      this.articles.push(articles[0])
      this.articles.push(articles[0])
      this.articles.push(articles[0])
      this.articles.push(articles[0])
      this.articles.push(articles[0])
      this.articles.push(articles[0])
      this.articles.push(articles[0])
      this.articles.push(articles[0])
      this.articles.push(articles[0])
      this.articles.push(articles[0])
      this.articles.push(articles[0])
      this.articles.push(articles[0])
      this.articles.push(articles[0])
      this.articles.push(articles[0])
      this.articles.push(articles[0])
      this.articles.push(articles[0])
      
    })
  }

}
