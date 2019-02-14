import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as moment from "moment/moment";

import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @ViewChild('chefcount') el: ElementRef<any>;
  @ViewChild('chefdecr') chef_decr_el: ElementRef<any>;

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

  toggleIcon(event,article){
    let el = this.el;
    let chef_decr_el = this.chef_decr_el;
    
    event.target.parentNode.parentNode.classList.remove("chef-button--default");
    event.target.parentNode.parentNode.classList.add("chef-button--active");
    setTimeout(function(){      
      event.target.parentNode.parentNode.classList.remove("chef-button--active");
      event.target.parentNode.parentNode.classList.add("chef-button--default");      
    },500);

    
    // +1 BULLET
    el.nativeElement.classList.add("active");
    setTimeout(function(){
      el.nativeElement.classList.remove("active");
    },1000);

    //DECREMENT ICON
    chef_decr_el.nativeElement.classList.add("active");
    setTimeout(function(){      
      chef_decr_el.nativeElement.classList.remove("active");
    },2000);

    this._article.incrementLike(article._id).subscribe((res)=>{      
      article.like_score++;
    })

  }

  revertLike(recipe){ 
    this.chef_decr_el.nativeElement.classList.remove("active");
    this._article.decrementLike(recipe._id).subscribe((res)=>{
      recipe.like_score--;
    })    
  }

}
