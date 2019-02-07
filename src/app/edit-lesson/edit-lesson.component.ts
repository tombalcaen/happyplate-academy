import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material';

import {LessonService} from '../services/lesson.service';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css']
})
export class EditLessonComponent implements OnInit {

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

  constructor(private _route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private _lesson: LessonService) { }

  
  lesson_id: string = "";
  lesson: any;
  range: any;
  sel: any;
  title: string = "";
  tekst: string = "";
  _id: string = "";
  last_saved: string = "";

  ngOnInit() {
    this._route.params
      .subscribe(params => {        
        this.lesson_id = params._id;
        this.getLesson(this.lesson_id);
      });
  }

  getLesson(lesson_id){
    this._lesson.getLessons(lesson_id).subscribe((lessonObj)=>{
      this.lesson = lessonObj;
      this.title = lessonObj.name;
      this.tekst = lessonObj.body;

      console.log(lessonObj)
    })
  }  

  save(){
    
    this.lesson.name = this.title;
    this.lesson.body = this.tekst;
    
    // let lesson = {
    //   name: this.title,
    //   body: this.tekst
    // }

    this._lesson.updateLesson(this.lesson).subscribe((res)=>{
      console.log(res);
      this.openSnackBar(res.message);
    })
  }

  openSnackBar(message) {
    this.snackBar.open(message,"ok",{duration: 2000});
  }

}
