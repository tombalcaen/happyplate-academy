import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    console.log("article id: " +this._route.snapshot.paramMap.get('_id'));
  }

}
