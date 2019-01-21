import { Component, OnInit, HostListener } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import { first } from 'rxjs/operators';

import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

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

  blnSidebar: boolean;
  blnDisabled: boolean = true;
  blnCreateCourse: boolean = false;
  blnCreateChapter: boolean = false;
  blnLessons: boolean = false;
  blnCourseOverview: boolean = false;

  course_id: string = "";

  active_course: any;
  active_course_title: string = "";
  active_chapter_title: string = "";
  chapter_title: string = "";
  course_title: string = "";
  course_description: string = "";

  sections: any;

  courses = [];
  lessons = [];

  ngOnInit() {
    if (window.innerWidth < 1024) {
      this.blnSidebar = false;
    } else {
      this.blnSidebar = true;
    }
    this.getCourses();
  }

  createChapter(){
    let chapter = {    
      name: this.chapter_title,
      cId: this.active_course._id,
      n: this.sections.length + 1,      
      lessons: []
    }

    this._courseService.createChapter(chapter).subscribe((res)=>{
      this.changeCourse(this.active_course._id)
    });
  }

  deleteChapter(){

  }

  createCourse(){
    let course = {
      name: this.course_title,
      descr: this.course_description,
      price: 0,
      status: 'pending'
    }
    this._courseService.createCourse(course).subscribe((res)=>{
      console.log(res)
    });
  }

  saveCourse(){
    let course = {
      _id: this.active_course._id,
      name: this.active_course.name,
      descr: this.active_course.descr,
      price: 0,
      status: 'pending'
    }
    
    this._courseService.updateCourse(course).subscribe((res)=>{
      
    })
  }

  deleteCourse(){
    this._courseService.deleteCourse(this.active_course._id).subscribe((res)=>{
      this.getCourses();
    })
  }

  getCourses(){
    this._courseService.getCourses().subscribe((courses)=>{
      this.courses = courses;      
      this.changeCourse(this.courses[0]._id)
    });
  }

  changeCourse(course){
    let crs = this.courses.find((test)=>{
      return test._id == course;
    })
    console.log(crs)
    this.clearContent();
    this.blnCourseOverview = true;
    this.active_course_title = crs.name;
    this.active_course = crs;
    // this.course_id = course._id; 
    this.getposts(crs._id)
  }

  getposts(cId){    
    this.sections = [];
    this._courseService.getChaptersForCourse(cId).subscribe((data)=>{            
      this.sections = data;
      this.sections.active = false;
      // this.sections.map((ch)=>{
      //   ch.lessons.map((less)=>{
      //     less.viewed = false;
      //     less.active = false; 
      //     // this.activatePost(0,0);
      //   })
      // })
    })
  }

  toggleSidebar(){
    this.blnSidebar?this.blnSidebar = false:this.blnSidebar = true;
  }

  toggleCreate(item){
    this.clearContent();
    if(item === 'course') this.blnCreateCourse = true;
    else if (item === 'chapter') this.blnCreateChapter = true;
  }

  toggleDisabled(blnDisabled){
    blnDisabled? this.blnDisabled = false: this.blnDisabled = true;
  }

  checkChapter(index){
    this.clearContent();
    this.blnLessons = true;
    this.lessons = this.sections[index].lessons;
    this.active_chapter_title = this.sections[index].name;
    // this.sections[index].active = true;
  }

  cancel(){
    this.changeCourse(this.active_course);
    this.clearContent();
  }

  clearContent(){
    this.blnCreateCourse = false;
    this.blnCreateChapter = false;
    this.blnLessons = false;
    this.blnCourseOverview = false;
    this.blnDisabled = true;
  }

  drop(event: CdkDragDrop<string[]>) {
    // moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

}
