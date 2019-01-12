import { Component, OnInit, HostListener } from '@angular/core';
import { Observable, observable } from 'rxjs';

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
  

  constructor() { }

  ngOnInit() {
    this.activatePost(0,0);
    if (window.innerWidth < 1024) {
      this.blnSidebar = false;
    } else {
      this.blnSidebar = true;
    }
  }

  blnSidebar: boolean;
  a: number = 0;
  i: number = 0;

  sections = [{sub: "Introduction",posts:[{subject:"first post",active: false, viewed: false}, {subject:"second subject",active: false, viewed: false}, {subject:"third subject",active: false, viewed: false}, {subject:"fourth subject",active: false, viewed: false}]},
              {sub: "What are you going to do",posts:[{subject:"eerst post",active: false, viewed: false}, {subject:"tweede subject",active: false, viewed: false}, {subject:"derde subject",active: false, viewed: false}, {subject:"vierde subject",active: false, viewed: false}]},
              {sub: "What are you going to do",posts:[{subject:"eerst post",active: false, viewed: false}, {subject:"tweede subject",active: false, viewed: false}, {subject:"derde subject",active: false, viewed: false}, {subject:"vierde subject",active: false, viewed: false}]},
              {sub: "What are you going to do",posts:[{subject:"eerst post",active: false, viewed: false}, {subject:"tweede subject",active: false, viewed: false}, {subject:"derde subject",active: false, viewed: false}, {subject:"vierde subject",active: false, viewed: false}]},
              {sub: "What are you going to do",posts:[{subject:"eerst post",active: false, viewed: false}, {subject:"tweede subject",active: false, viewed: false}, {subject:"derde subject",active: false, viewed: false}, {subject:"vierde subject",active: false, viewed: false}]},
              {sub: "What are you going to do",posts:[{subject:"eerst post",active: false, viewed: false}, {subject:"tweede subject",active: false, viewed: false}, {subject:"derde subject",active: false, viewed: false}, {subject:"vierde subject",active: false, viewed: false}]}
          ]

  toggleSidebar(){
    this.blnSidebar?this.blnSidebar = false:this.blnSidebar = true;
  }

  activatePost(a,i){    
    this.sections[this.a].posts[this.i].active = false;
    this.a = a;
    this.i = i;
    this.sections[a].posts[i].active = true;
    this.sections[a].posts[i].viewed = true;
    this.getpost();
  }

  getpost(){

  }

  nextLesson(){
    //check length of posts
    //if not equal to max, just + 1, If equal to max, sections + 1 and posts = 0;
  }

  previousLesson(){

  }

}
