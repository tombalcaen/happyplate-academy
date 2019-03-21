import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Observable, observable } from 'rxjs';

import {CourseService} from '../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../services/lesson.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @ViewChild('scrollcontent') myDiv: ElementRef;
  @ViewChild('el') el:ElementRef;
  @HostListener('window:resize', ['$event'])
  onResize(event) {    
    if (window.innerWidth < 1024) {
      this.blnSidebar = false;
    } else {
      this.blnSidebar = true;
    }
    // this.innerWidth = window.innerWidth;
  }
  
  constructor(private _courseService: CourseService,
              private _lesson: LessonService,
              private _route: ActivatedRoute,
              private _sanitizer : DomSanitizer) {
                this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/VFBSF6ubn4o");
               }

  text: any;
  audioFile: any;
  safeURL: any;
  subject: any;
  cId: string = "";
  progress: number = 0;

  lessonType: number = 1;

  images = [];

  ngOnInit() {    
    if (window.innerWidth < 1024) {
      this.blnSidebar = false;
    } else {
      this.blnSidebar = true;
    }

    this.cId = this._route.snapshot.paramMap.get('id');
    this.getposts(this.cId);
  }

  blnSidebar: boolean;
  a: number = 0;
  i: number = 0;
  sections = [];
  // sections = [{sub: "Introduction",posts:[{subject:"first post",active: false, viewed: false}, {subject:"second subject",active: false, viewed: false}, {subject:"third subject",active: false, viewed: false}, {subject:"fourth subject",active: false, viewed: false}]},
  //             {sub: "What are you going to do",posts:[{subject:"eerst post",active: false, viewed: false}, {subject:"tweede subject",active: false, viewed: false}, {subject:"derde subject",active: false, viewed: false}, {subject:"vierde subject",active: false, viewed: false}]},
  //             {sub: "What are you going to do",posts:[{subject:"eerst post",active: false, viewed: false}, {subject:"tweede subject",active: false, viewed: false}, {subject:"derde subject",active: false, viewed: false}, {subject:"vierde subject",active: false, viewed: false}]},
  //             {sub: "What are you going to do",posts:[{subject:"eerst post",active: false, viewed: false}, {subject:"tweede subject",active: false, viewed: false}, {subject:"derde subject",active: false, viewed: false}, {subject:"vierde subject",active: false, viewed: false}]},
  //             {sub: "What are you going to do",posts:[{subject:"eerst post",active: false, viewed: false}, {subject:"tweede subject",active: false, viewed: false}, {subject:"derde subject",active: false, viewed: false}, {subject:"vierde subject",active: false, viewed: false}]},
  //             {sub: "What are you going to do",posts:[{subject:"eerst post",active: false, viewed: false}, {subject:"tweede subject",active: false, viewed: false}, {subject:"derde subject",active: false, viewed: false}, {subject:"vierde subject",active: false, viewed: false}]}
  //         ]

  checkScrollposition(event){
    let total1 = event.target.scrollHeight - event.target.clientHeight;
    this.progress = event.target.scrollTop/total1*100;
  }

  toggleSidebar(){
    this.blnSidebar?this.blnSidebar = false:this.blnSidebar = true;
  }

  activatePost(a,i){    
    if(this.sections[this.a] && this.sections[this.a].lessons){      
      this.sections[this.a].lessons[this.i].active = false;
      this.a = a;
      this.i = i;
      this.sections[a].lessons[i].active = true;
      this.sections[a].lessons[i].viewed = true;
      this.lessonType = this.sections[a].lessons[i].type;      
    }
    this.getpost(a,i);
  }

  getposts(cId){
    this.sections = [];
    let n = 0;
    this._courseService.getChaptersForCourse(cId).subscribe((data)=>{          
      this.sections = data;      
      this.sections.map((ch)=>{
        ch.lessons.map((less)=>{
          console.log(less)
          n++;
          less.viewed = false;
          less.active = false; 
          if(n===1)this.activatePost(0,0);
        })
      })
    })
  }

  getpost(a,i){
    this.subject = this.sections[a].lessons[i].name;
    // this.text = this.sections[a].lessons[i].body;
    this.images = [];
    let n = 0;
    
    if(this.lessonType === 1){
      this.text = this.sections[a].lessons[i].body;
    } else if(this.lessonType === 2){
      this.audioFile = this.sections[a].lessons[i].files[0];
      console.log(this.audioFile)

      var audio = document.createElement('audio');
      audio.src = this.audioFile.name;
      audio.play();


    } else if(this.lessonType === 3){
      
    }
    /*this.sections[a].lessons[i].files.map((file)=>{
      this._lesson.findFile(file).subscribe((l)=>{
        this.images.push(l);
      })
      this._lesson.getImage(file).subscribe((f)=>{
        n++;
        let imgNode = document.createElement("img");

        // let img = new Image;
        // img.src = URL.createObjectURL(f);        
        
        let reader = new FileReader();
    
        reader.readAsDataURL(f);
        reader.onload = (_event) => { 
          imgNode.src = reader.result.toString(); 
        }
        
        let con = this.el.nativeElement.getElementsByClassName('figure-container');

        console.log(this.images.length + " " + n)

        // let con2 = document.getElementById((this.images.length - n + 1).toString())
        con[0].prepend(imgNode)

        // this.el.nativeElement.appendChild(imgNode)

        console.log(this.text)
      })
    })*/

    
    // this._lesson.getImage(this.sections[a].lessons[i].files[0]).subscribe((img)=>{
    //   console.log(img)
    // })

  }

  checkNextLesson(){
    if(this.a != this.sections.length - 1 || this.i != this.sections[this.sections.length - 1].lessons.length - 1) return false;
    else return true;
  }

  checkPreviousLesson(){
    if(this.a != 0 || this.i != 0) return false;
    else return true;
  }

  nextLesson(){
    if(this.sections[this.a].lessons.length - 1 == this.i){      
      this.activatePost(this.a + 1,0);
    } else {      
      this.activatePost(this.a,this.i + 1);
    }    
  }

  previousLesson(){
    if(this.i == 0){
      this.activatePost(this.a - 1,this.sections[this.a - 1].lessons.length - 1);
    } else {
      this.activatePost(this.a,this.i - 1);
    }
  }

}
