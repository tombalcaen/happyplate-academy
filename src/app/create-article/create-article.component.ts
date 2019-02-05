import { Component, OnInit } from '@angular/core';

import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline'],        // toggled buttons      
  
      [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }, { 'header': 4 }, { 'header': 5 }, { 'header': 6 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],       

      [{ 'align': [] }],
  
      ['clean'],                                         // remove formatting button
  
      ['link', 'image', 'video']                         // link and image, video
    ]
  };

  constructor(private _article: ArticleService) { }

  ngOnInit() {
  }

  htmlText: any;
  title: string;
  description: string;
  contributorTitle: string;
  contributorName: string;
  images : Array<Object> = []

  onSelectionChanged(event){
    if(event.oldRange == null){
      this.onFocus();
    }
    if(event.range == null){
      this.onBlur();
    }
  }

  onContentChanged(event){
    console.log(this.htmlText)
  }

  onFocus(){
    console.log("On Focus");
  };

  onBlur(){
    console.log("On Blur");
  }

  onFileChanged(event) {
    console.log(event.target.files[0])
    const file = event.target.files[0]
    let reader = new FileReader();
    
    reader.readAsDataURL(file);
    reader.onload = (_event) => { 
      this.images.push({source: reader.result.toString(), height: '200px', width: '200px', title: "image title"}) ; 
    }
  }

  saveArticle(){
    console.log(this.htmlText,this.title,this.images)
    this._article.createArticle(this.htmlText,this.title,this.description,{name: this.contributorName, title: this.contributorTitle},this.images).subscribe((res)=>{
      console.log(res)
    })
  }

}
