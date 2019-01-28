import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {LessonService} from '../services/lesson.service';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css']
})
export class EditLessonComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
              private _lesson: LessonService) { }

  lesson_id: string = "";
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
      this.title = lessonObj.name;
      this.tekst = lessonObj.body;
      console.log(lessonObj)
    })
  }

  bold(event) {
    this.selectionEngine();    
    document.execCommand('bold',false,null)
  }

  italic(event){
    this.selectionEngine();
    document.execCommand('italic',false,null);
  }

  underline(event){
    this.selectionEngine();
    document.execCommand('underline',false,null);
  }

  onHeader1(event){
    this.selectionEngine();
    document.execCommand('formatBlock', false, '<h1>');
  }
  
  onHeader2(event){
    this.selectionEngine();
    document.execCommand('formatBlock', false, '<h2>');  
  }
  
  onHeader3(event){
    this.selectionEngine();
    document.execCommand('formatBlock', false, '<h3>');  
  }

  justifyCenter(event){
    this.selectionEngine();
    document.execCommand('justifyCenter',false,null);
  }

  justifyLeft(event){
    this.selectionEngine();
    document.execCommand('justifyLeft',false,null);
  }

  justifyRight(event){
    this.selectionEngine();
    document.execCommand('justifyRight',false,null);
  }
  
  redo(){
    this.selectionEngine();
    document.execCommand('redo', false);  
  }

  undo(){
    this.selectionEngine();
    document.execCommand('undo', false);  
  }

  highlight(){
    this.selectionEngine();
    document.execCommand("BackColor", false, "yellow");
  }

  selectionEngine(){
    this.range = this.checkSelection();    
    this.restoreSelection(this.range);
  }

  checkSelection(){
    if (window.getSelection) {
      this.sel = window.getSelection();
      if (this.sel.getRangeAt && this.sel.rangeCount) {
          return this.sel.getRangeAt(0);
      }
    }
  }

  restoreSelection(range) {
    if (range) {
        if (window.getSelection) {
            this.sel = window.getSelection();
            this.sel.removeAllRanges();
            this.sel.addRange(range);
        }
    }
  }

  onBlur(tekst){    
    this.tekst = tekst;
  }
  

  save(){
    let lesson = {
      name: this.title,
      body: this.tekst
    }

    console.log(lesson)

  }

}
