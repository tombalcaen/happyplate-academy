import { Component, OnInit, HostListener } from '@angular/core';
import { Observable, observable } from 'rxjs';

import {CourseService} from '../services/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

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
              private _route: ActivatedRoute) { }

  text: any;
  subject: any;
  cId: string = "";

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
    }
    this.getpost(a,i);
  }

  getposts(cId){
    this.sections = [];
    this._courseService.getChaptersForCourse(cId).subscribe((data)=>{            
      this.sections = data;
      
      this.sections.map((ch)=>{
        ch.lessons.map((less)=>{
          less.viewed = false;
          less.active = false; 
          this.activatePost(0,0);
        })
      })
    })
  }

  getpost(a,i){
    this.subject = this.sections[a].lessons[i].name;
    this.text = this.sections[a].lessons[i].body;
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
