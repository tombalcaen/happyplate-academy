import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  htmlText: any;

  onSelectionChanged(event){
    if(event.oldRange == null){
      this.onFocus();
    }
    if(event.range == null){
      this.onBlur();
    }
  }

  onContentChanged(){
    console.log(this.htmlText)
  }

  onFocus(){
    console.log("On Focus");
  };

  onBlur(){
    console.log("On Blur");
  }
}
