import { Component, OnInit, HostListener } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import * as moment from 'moment';

import { CourseService } from '../services/course.service';
import { LessonService } from '../services/lesson.service';
import { ChapterService } from '../services/chapter.service';

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

  constructor(private _courseService: CourseService,
              private _chapterService: ChapterService,
              private _lessonService: LessonService) { }

  blnSidebar: boolean;
  blnDisabled: boolean = true;
  blnCreateCourse: boolean = false;
  blnCreateChapter: boolean = false;
  blnEditChapter: boolean = false;
  blnLessons: boolean = false;
  blnCourseOverview: boolean = false;

  course_id: string = "";

  active_course: any;
  active_course_title: string = "";
  active_chapter: any;
  active_chapter_id: string = "";
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

    this._chapterService.createChapter(chapter).subscribe((res)=>{      
      this.changeCourse(this.active_course._id)
    });
  }

  editChapter(){
    let chapter = {
      _id: this.active_chapter_id,
      name: this.active_chapter_title,
      n: this.active_chapter.n
    }

    this._chapterService.updateChapter(chapter).subscribe((res)=>{      
      this.getCourses();
    })

  }

  deleteChapter(){
    this._chapterService.deleteChapter(this.active_chapter_id).subscribe((res)=>{
      this.getCourses();
    })
  }

  getCourses(){
    this._courseService.getCourses().subscribe((courses)=>{
      this.courses = courses;      
      this.changeCourse(this.courses[0]._id)
    });
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
      this.blnDisabled = true;
    })
  }

  deleteCourse(){
    this._courseService.deleteCourse(this.active_course._id).subscribe((res)=>{
      this.getCourses();
    })
  }

  changeCourse(course){
    let crs = this.courses.find((test)=>{
      return test._id == course;
    })    
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
      this.sections.map((ch)=>{
        ch.lessons.map((less)=>{          
          less.last_edit = moment(+less.last_edit).fromNow();          
        })
      })
    })
  }

  deleteLesson(lesson_id){
    this._lessonService.deleteLesson(lesson_id).subscribe((res)=>{      
    })
  }

  toggleSidebar(){
    this.blnSidebar?this.blnSidebar = false:this.blnSidebar = true;
  }

  toggleCreate(item){
    this.active_chapter_id = "";
    this.active_chapter_title = "";
    this.clearContent();
    if(item === 'course') this.blnCreateCourse = true;
    else if (item === 'chapter') this.blnCreateChapter = true;
  }

  toggleEdit(item){
    this.clearContent();
    if(item === 'chapter') this.blnEditChapter = true;
  }

  toggleDisabled(blnDisabled){
    blnDisabled? this.blnDisabled = false: this.blnDisabled = true;
  }

  checkChapter(index){
    this.clearContent();
    this.blnLessons = true;
    this.active_chapter = this.sections[index];
    this.lessons = this.sections[index].lessons;
    this.active_chapter_title = this.sections[index].name;
    this.active_chapter_id = this.sections[index]._id;
    // this.sections[index].active = true;
  }

  cancel(){
    this.changeCourse(this.active_course);
    this.clearContent();
  }

  clearContent(){
    this.blnCreateCourse = false;
    this.blnCreateChapter = false;
    this.blnEditChapter = false;
    this.blnLessons = false;
    this.blnCourseOverview = false;
    this.blnDisabled = true;
  }

  drop(event: CdkDragDrop<string[]>) {    
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);    
    this.sections.map((section,index)=>{
      console.log(section)
      console.log(index)
      if(section.n != index + 1){
        this._chapterService.updateChapter({_id: section._id,name: section.name, n: index + 1}).subscribe((r)=>{
          console.log(r)
        })
      }
    })
    
  }

}
