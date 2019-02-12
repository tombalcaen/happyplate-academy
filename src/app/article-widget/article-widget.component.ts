import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'article-widget',
  templateUrl: './article-widget.component.html',
  styleUrls: ['./article-widget.component.css']
})
export class ArticleWidgetComponent implements OnInit {
  @Input() article: any;
  constructor(private _article: ArticleService) { }

  ngOnInit() {
  }

}
