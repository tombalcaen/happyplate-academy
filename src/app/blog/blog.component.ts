import { Component, OnInit } from '@angular/core';

import {ArticleService} from '../services/article.service';
import {RecipeService} from '../services/recipe.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private _article: ArticleService,
              private _recipe: RecipeService) { }

  trending = [1,2,3,4];
  articles = [1,2,3,4];
  recipes = [];

  ngOnInit() {
    this._article.getArticles().subscribe((articles)=>{
      console.log(articles)
    })

    this._recipe.getRecipes().subscribe((recipes)=>{            
      this.recipes = recipes

      console.log(this.recipes)
    })

  }

}
