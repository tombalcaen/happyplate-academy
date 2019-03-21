import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';

import { LessonService } from '../services/lesson.service';

@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.css']
})
export class CreateLessonComponent implements OnInit {
  @ViewChild('el1') el1:ElementRef;

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

  constructor(private _lesson: LessonService,
              private _route: ActivatedRoute,
              private router: Router,
              private _sanitizer: DomSanitizer) {
                this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/-fFbeSykaJk");
               }

  last_saved: any;
  blnBold: boolean = false;
  blnBoldSupport: boolean = false;
  blnItalic: boolean = false;
  blnEditor: boolean = false;

  blnShowTextType: boolean = false;
  blnShowAudioType: boolean = false;
  blnShowVideoType: boolean = false;

  sel: any;
  range: any;

  safeURL: any;

  n_regex = 0;
  n_image = 0;

  title: string = "";
  tekst: string = "";
  videocode: string = "";
  chId: string = "";

  audioFile: any;

  file_array: Array<any> = []

  ngOnInit() {
    this._route.params
      .subscribe(params => {        
        this.chId = params.chId;
      });
    // document.execCommand("insertHTML", false, "<p><br></p>");
    // this.blnBoldSupport = document.queryCommandSupported('bold');
  }

  onChooseLessonType(type){
    switch(type){
      case 'text':{
        this.resetView();
        this.blnShowTextType = true;
        break;
      }
      case 'audio':{
        this.resetView();
        this.blnShowAudioType = true;
        break;
      }
      case 'film':{
        this.resetView();
        this.blnShowVideoType = true;
        break;
      }
    }
  }

  resetView(){
    this.blnShowTextType = false;
    this.blnShowAudioType = false;
    this.blnShowVideoType = false;
  }

  save(){
    console.log(this.tekst)
    let returnFiles = [];

    let lesson = {
      chId: this.chId,
      name: this.title,
      body: this.tekst,
      files: [],
      type: 1,
      status: "draft"
    }

    console.log(lesson)

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

  saveAudioLesson(){

    console.log(this.audioFile)

    let lesson = {
      chId: this.chId,
      name: this.title,
      body: "",
      files: [{
        name: this.audioFile.name,
        transcript: "",
        size: this.audioFile.size,
        type: this.audioFile.type,
        file: this.audioFile
      }],
      type: 2,
      status: "draft"
    }

    console.log(lesson)

    this._lesson.createLesson(lesson).then((res)=>{
      this.router.navigate(['editor'])
    });

    this.last_saved = moment().format("HH:mm:ss");

  }

  onAudioFileChanged($event){
    this.audioFile = $event.target.files[0];    
  }

}
