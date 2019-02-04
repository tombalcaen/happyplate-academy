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

  trending = [];
  articles = [];
  recipes = [];


  ngOnInit() {
    this._article.getArticles().subscribe((articles)=>{      
      this.articles = articles;

      articles.map((article)=>{
        article.type = 1;
        this.trending.push(article);
        this.trending.sort((a,b)=>{
          return b.dateCreated - a.dateCreated;
        });
      })

    })

    this._recipe.getRecipes().subscribe((recipes)=>{            
      this.recipes = recipes

      recipes.map((recipe)=>{
        recipe.type = 2;
        this.trending.push(recipe);
        this.trending.sort((a,b)=>{
          return b.dateCreated - a.dateCreated;
        });
      })
    })

    console.log(this.trending)
  }

}
