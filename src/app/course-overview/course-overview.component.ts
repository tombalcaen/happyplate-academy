import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';


@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.css']
})
export class CourseOverviewComponent implements OnInit {

  constructor(private _courseService: CourseService) { }

  courses: any;

  ngOnInit() {
    this.getCourses();
  }

  getCourses(){
    this._courseService.getCourses().subscribe((courses)=>{
      this.courses = courses;    
    });
  }

}
