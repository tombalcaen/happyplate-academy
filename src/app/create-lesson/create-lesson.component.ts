import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { LessonService } from '../services/lesson.service';

@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.css']
})
export class CreateLessonComponent implements OnInit {

  constructor(private _lesson: LessonService) { }

  last_saved: any;
  blnBold: boolean = false;
  blnBoldSupport: boolean = false;
  blnItalic: boolean = false;
  sel: any;
  range: any;

  title: string = "";
  tekst: string = "";

  ngOnInit() {
    this.blnBoldSupport = document.queryCommandSupported('bold');
  }

  bold(event) {
    this.selectionEngine();    
    if(!this.blnBold) document.execCommand('bold',false,null)
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
    this._lesson.createLesson(lesson);
    this.last_saved = moment().format("HH:mm:ss");
    console.log(this.tekst);
  }

}
