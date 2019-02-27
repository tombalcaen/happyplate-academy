import { Component, OnInit } from '@angular/core';
import * as moment from 'moment/moment';

import { AuthService } from "../services/auth.service";
import { RecipeService } from "../services/recipe.service";
import { ArticleService } from "../services/article.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _auth: AuthService,
              private _recipe: RecipeService,
              private _article: ArticleService) { }

  user = {fullName: '', email: ''};
  recipeRates = [];
  articleLikes = [];

  ngOnInit() {
    this.getProfile()    
    this.user.fullName = this._auth.loadFullName();
    this.user.email = this._auth.loadEmail();
    console.log(this.user)    
  }

  getData(option){
    console.log(option)
    if(option == 0){
      //get profile
      this.getProfile();
    } else if(option == 1){
      this.getRatings();
    } else if(option == 2){
      this.getLikes();
    }
    //get beoordelingen

    //get likes
  }

  getProfile(){

  }

  getRatings(){
    if(this.recipeRates.length <= 0){
      this._recipe.getAllRatesForId().subscribe((rates)=>{        
        console.log(rates)
        this.recipeRates = rates;
        this.recipeRates.map((r)=>{
          r.dateStr = moment(r.date).format("DD/MM/YYYY");
        })
      })
    }
  }

  getLikes(){
    console.log("likes")
    if(this.articleLikes.length <= 0){
      this._article.getAllLikesForId().subscribe((likes)=>{
        console.log(likes)
        this.articleLikes = likes;
        this.articleLikes.map((l)=>{
          l.dateStr = moment(l.date).format("DD/MM/YYYY");
        })
      })
    }
  }

}
