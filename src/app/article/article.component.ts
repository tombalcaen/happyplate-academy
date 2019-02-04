import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as moment from "moment/moment";

import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
              private _article: ArticleService) { }

  article_id: string;
  article: any;

  ngOnInit() {
    this.article_id = this._route.snapshot.paramMap.get('_id');
    // this._article.incrementView(this.recipe_id);
    this._article.getArticleById(this.article_id).subscribe((articleObj)=>{      
      this.article = articleObj[0];   
      this.article.created_str = moment(+articleObj[0].dateCreated).format("MM MMMM, YYYY")
      console.log(this.article)     
      // this.recipe.images[0].source = this.domSanitizer.bypassSecurityTrustUrl(this.recipe.images[0].source);      
    })
  }

}
