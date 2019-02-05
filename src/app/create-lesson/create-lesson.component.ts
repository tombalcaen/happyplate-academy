import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';

import { LessonService } from '../services/lesson.service';

@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.css']
})
export class CreateLessonComponent implements OnInit {
  @ViewChild('el1') el1:ElementRef;
  constructor(private _lesson: LessonService,
              private _route: ActivatedRoute,
              private router: Router) { }

  last_saved: any;
  blnBold: boolean = false;
  blnBoldSupport: boolean = false;
  blnItalic: boolean = false;
  blnEditor: boolean = false;
  sel: any;
  range: any;

  n_regex = 0;
  n_image = 0;

  title: string = "";
  tekst: string = "";
  chId: string = "";

  file_array: Array<any> = []

  ngOnInit() {
    this._route.params
      .subscribe(params => {        
        this.chId = params.chId;
      });
    document.execCommand("insertHTML", false, "<p><br></p>");
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

  highlight(event){
    this.selectionEngine();
    document.execCommand("BackColor", false, "yellow");
  }

  addYoutube($event){
    this.selectionEngine();
    this.el1.nativeElement.append("<span class=defaultvalue defaultValue--prompt>Paste a YouTube link, and press Enter</span>");
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

  onFocus(){
    this.blnEditor = true;
  }

  onBlur(tekst){    
    this.n_regex = 0;
    this.tekst = tekst;
    // this.tekst = tekst.replace(/src\s*=\s*"[^"]*"/g,(test)=>{      
    //   this.n_regex++
    //   return "";
    // });
    console.log( this.tekst)
    this.blnEditor = false;
  }

  onEnterDown($event){
    console.log("test")
    console.log(this.el1.nativeElement.children)
    // document.execCommand("insertHTML", false, "<p></p>");
  }

  onBackSpaceDown($event){
    console.log(this.el1.nativeElement.children.length)
  }

  onFileChanged(event) {
    const file = event.target.files[0]

    this.n_image++;
    
    this.file_array.push(event.target.files[0]);

    this.selectionEngine();
    let newNode = document.createElement("figure");
    
    let imgNode = document.createElement("img");

    let reader = new FileReader();
    
    reader.readAsDataURL(file);
    reader.onload = (_event) => { 
      imgNode.src = reader.result.toString(); 
    }
    
    //add data to element
    newNode.classList.add('figure-container');
    newNode.style.cssText = "text-align: center;";
    newNode.setAttribute("id", "image_" + this.n_image);

    //add data to element
    imgNode.style.cssText = "max-width: 500px; height: auto;"
    imgNode.id = this.file_array.length.toString();

    newNode.appendChild(imgNode);
    this.range.insertNode(newNode);
    this.el1.nativeElement.appendChild(newNode)
    let breakElement = document.createElement("br");
    this.el1.nativeElement.appendChild(breakElement)
  }

  save(){

    let returnFiles = [];

    let lesson = {
      chId: this.chId,
      name: this.title,
      body: this.tekst,
      files: [],
      type: 1,
      status: "draft"
    }

    var payload = new FormData();
    for (var i = 0; i < this.file_array.length; i++) {
      var file = this.file_array[i];
      payload.append('file', file);
    }

    // console.log(this.d1.nativeElement.innerHTML.getElementById("0"));

    //upload files
    // this._lesson.uploadFile(payload).then((req)=>{         
    //   return req.file.map((file)=>{        
    //     return file.filename;
    //   })  
    // }).then((returnFiles)=>{    
       
    //   lesson.files = returnFiles,      
      this._lesson.createLesson(lesson).then((res)=>{
        this.router.navigate(['editor'])
      });

      this.last_saved = moment().format("HH:mm:ss");    
    // })

    //upload tekst
    
  }

}
