import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatSnackBar} from '@angular/material';
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

  @ViewChild('deleteChapterModal') private deleteChapterModal : ElementRef;
  @ViewChild('deleteCourseModal') private deleteCourseModal : ElementRef;

  courseForm: FormGroup;
  chapterForm: FormGroup;

  constructor(private fb: FormBuilder,
              private _courseService: CourseService,
              private _chapterService: ChapterService,
              private _lessonService: LessonService,
              private snackBar: MatSnackBar) {
                this.createCourseForm();
                this.createChapterForm();
               }

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
  active_lesson = {
    name: "",
    body: "",
    chId: "",
    created: "",
    files: [],
    last_edit: "",   
    _id: "",
  };
  chapter_title: string = "";
  course_title: string = "";
  course_description: string = "";

  sections: any;

  courses = [];
  lessons = [];

  createCourseForm(){
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      descr: ['', Validators.required],
      price: 0,
      status: 'pending'
    })
  }

  createChapterForm(){
    this.chapterForm = this.fb.group({
      name: ['', Validators.required],
    })
  }

  ngOnInit() {
    if (window.innerWidth < 1024) {
      this.blnSidebar = false;
    } else {
      this.blnSidebar = true;
    }
    this.getCourses();
  }

  //COURSES
  createCourse(courseObj){        
    // let course = {
    //   name: this.course_title,
    //   descr: this.course_description,
    //   price: 0,
    //   status: 'pending'
    // }

    this._courseService.createCourse(courseObj).subscribe((res)=>{
      this.openSnackBar('Cursus gecreeërd!');
      this.getCourses();
    });
  }

  setEditCourse(){
    //set form values
    this.courseForm.setValue({
      'name': this.active_course.name,
      'descr': this.active_course.descr,
      'price': this.active_course.price,
      'status': this.active_course.status
    })
    this.toggleCreate('course');
  }

  saveCourse(){
    let course = {
      _id: this.active_course._id,
      name: this.active_course.name,
      descr: this.active_course.descr,
      price: 0,
      status: 'draft'
    }
    
    this._courseService.updateCourse(course).subscribe((res)=>{
      this.openSnackBar("Cursus details gewijzigd!")
      this.blnDisabled = true;
    })
  }

  deleteCourse(){
    this._courseService.deleteCourse(this.active_course._id).subscribe((res)=>{
      this.deleteCourseModal.nativeElement.click();
      this.openSnackBar(this.active_course_title + " verwijdert!")
      this.clearContent();
      this.getCourses();
    })
  }

  //CHAPTERS
  createChapter(chapterObj){
    
    let chapter = {    
      name: chapterObj.name,
      cId: this.active_course._id,
      n: this.sections.length + 1,      
      lessons: []
    }

    this._chapterService.createChapter(chapter).subscribe((res)=>{      
      this.openSnackBar('Hoofdstuk gecreeërd!');
      this.changeCourse(this.active_course._id);      
    });
  }

  editChapter(){
    let chapter = {
      _id: this.active_chapter_id,
      name: this.active_chapter_title,
      n: this.active_chapter.n
    }

    this._chapterService.updateChapter(chapter).subscribe((res)=>{      
      this.openSnackBar("Hoofdstuk details gewijzigd!")
      this.getCourses();
    })

  }

  deleteChapter(){
    this._chapterService.deleteChapter(this.active_chapter_id).subscribe((res)=>{      
      this.deleteChapterModal.nativeElement.click();
      this.openSnackBar('Hoofdstuk verwijdert!');
      this.getCourses();
    })
  }

  getCourses(){
    this.courses = [];
    this._courseService.getCourses().subscribe((courses)=>{      
        this.courses = courses;      
        if(this.courses[0]){
          this.changeCourse(this.courses[0]._id)
        }      
    });
  }

  changeCourse(course){
    console.log(this.courses)
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
    this._courseService.getChaptersForCourseALL(cId).subscribe((data)=>{      
      this.sections = data;
      this.sections.active = false;
      this.sections.map((ch)=>{
        ch.lessons.map((less)=>{          
          less.last_edit = moment(+less.last_edit).fromNow();          
        })
      })
    })
  }

  setLesson(lesson){
    this.active_lesson = lesson;
    console.log(lesson)
  }

  deleteLesson(){    
    this._lessonService.deleteLesson(this.active_lesson).then((res)=>{  
      this.openSnackBar('Les verwijdert!');
      this.lessons = this.lessons.filter((el)=>{
        return el._id != this.active_lesson._id;
      }) //lesson._id
      // this.changeCourse(this.active_course)
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

  togglePublish(lesson){
    lesson.status === 'published'?lesson.status = 'draft':lesson.status = 'published';
    this._lessonService.updateStatus(lesson).subscribe((res)=>{
      console.log(res)
      this.openSnackBar("les status gewijzigd naar: " + lesson.status)
    })
  }

  onTogglePublishCourse(){   
    this.active_course.status === 'published'?this.active_course.status = 'draft':this.active_course.status = 'published'    
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
    this.changeCourse(this.active_course._id);
    this.clearContent();
    this.blnCourseOverview = true;
  }

  clearContent(){
    this.blnCreateCourse = false;
    this.blnCreateChapter = false;
    this.blnEditChapter = false;
    this.blnLessons = false;
    this.blnCourseOverview = false;
    this.blnDisabled = true;
    this.sections = [];
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

  openSnackBar(message) {
    this.snackBar.open(message,"ok",{duration: 2000});
  }
}
