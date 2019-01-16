import { Component, OnInit, HostListener } from '@angular/core';
import { Observable, observable } from 'rxjs';

import {CourseService} from '../services/course.service';

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
  
  constructor(private _courseService: CourseService) { }

  text: any;
  subject: any;

  ngOnInit() {    
    if (window.innerWidth < 1024) {
      this.blnSidebar = false;
    } else {
      this.blnSidebar = true;
    }

    this.getposts();
    console.log(this.sections)
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
    if(this.sections[this.a] && this.sections[this.a].posts){
      this.sections[this.a].posts[this.i].active = false;
      this.a = a;
      this.i = i;
      this.sections[a].posts[i].active = true;
      this.sections[a].posts[i].viewed = true;
    }
    this.getpost(a,i);
  }

  getposts(){
    this.sections = [];
    this._courseService.getChaptersForCourse().subscribe((data)=>{      
      data.map((d)=>{        
        this.sections.push({id: d._id,sub: d.name,posts:[]})        
        this._courseService.getLessons(d._id).subscribe((lessons)=>{          
          lessons.map((lesson)=>{                        
            this.sections.find((ch)=>{return ch.id = lesson.chId})
            // this.sections.find((ch)=>{
            //   console.log(ch.id + " " + lesson.chId)              
            //   return ch.id = lesson.chId
            // }).posts.push({subject: lesson.name, active: false, viewed: false, body: lesson.body})            
          })                    
        })
      })   
    })
  }

  getpost(a,i){
    this.subject = this.sections[a].posts[i].subject;
    this.text = this.sections[a].posts[i].body;
  }

  nextLesson(){
    if(this.sections[this.a].posts.length - 1 == this.i){      
      this.activatePost(this.a + 1,0);
    } else {      
      this.activatePost(this.a,this.i + 1);
    }    
  }

  previousLesson(){
    if(this.i == 0){
      this.activatePost(this.a - 1,this.sections[this.a - 1].posts.length - 1);
    } else {
      this.activatePost(this.a,this.i - 1);
    }
  }

}
