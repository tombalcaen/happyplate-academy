import { Component, OnInit } from '@angular/core';

import {ArticleService} from '../services/article.service';
import {RecipeService} from '../services/recipe.service';
import { BlogService } from '../services/blog.service';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private _article: ArticleService,
              private _recipe: RecipeService,
              private _blog: BlogService) { }

  trending = [];
  articles = [];
  recipes = [];
  highlights = [];
  myRecipes = [];


  ngOnInit() {
    this._blog.getHighlights().subscribe((highlights)=>{
      this.highlights = highlights;

      this.highlights[0].articles.map((article)=>{
        article.datePublished_str = moment(article.datePublished_str).format("D MMM");
      })
      
    })

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

    // this._recipe.getMyRecipes().subscribe((myRecipes)=>{      
    //   this.myRecipes = myRecipes.myrecipes[0].recipeId;      
    // })

  }

}
