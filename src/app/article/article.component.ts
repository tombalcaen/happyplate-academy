import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';

import * as moment from "moment/moment";

import { ArticleService } from '../services/article.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @ViewChild('chefcount') el: ElementRef<any>;
  // @ViewChild('chefdecr') chef_decr_el: ElementRef<any>;  
  @ViewChild('promptLoginModal') private promptLoginModal : ElementRef;
  @ViewChild('loginModal') private loginModal : ElementRef;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _auth: AuthService,
              private _article: ArticleService) {
                this.routeState = _router.routerState.snapshot;
               }

  routeState: RouterStateSnapshot;
  article_id: string;
  article: any;
  myPoints: number;

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
    //if not logged in prompt login
    if(this._auth.loggedIn()){
      this.promptLoginModal.nativeElement.click();
    } else {
      let el = this.el;
      // let chef_decr_el = this.chef_decr_el;
      
      event.target.parentNode.parentNode.classList.remove("chef-button--default");
      event.target.parentNode.parentNode.classList.add("chef-button--active");
      setTimeout(function(){      
        event.target.parentNode.parentNode.classList.remove("chef-button--active");
        event.target.parentNode.parentNode.classList.add("chef-button--default");      
      },500);

      this._article.incrementLike(this._auth.loadLocalUser(),article._id).subscribe((res)=>{    
        console.log(res)
        this.myPoints = res.article.value;

        //DECREMENT ICON
        // chef_decr_el.nativeElement.classList.add("active");
        // setTimeout(function(){      
        //   chef_decr_el.nativeElement.classList.remove("active");
        // },2000);

        // +1 BULLET
        el.nativeElement.classList.add("active");
        setTimeout(function(){
          el.nativeElement.classList.remove("active");
        },1000);

        if(!res.success){
          // alert("Er is een maximum aan 5 pluspunten per artikel")
        } else {
          article.like_score++;
        }        
      })
    }
  }

  revertLike(recipe){ 
    // this.chef_decr_el.nativeElement.classList.remove("active");
    this._article.decrementLike(recipe._id).subscribe((res)=>{
      recipe.like_score--;
    })    
  }

  onCallToAction(option){
    this.loginModal.nativeElement.click();
    if(option === "register"){
      this._router.navigateByUrl('/create-account');
    } else if (option === "login"){
      // this._router.navigateByUrl('/login')
      
      this._router.navigate(['login'], { queryParams: { returnUrl: this.routeState.url }});
    }
  }

}
