import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseComponent } from './course/course.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CourseOverviewComponent } from './course-overview/course-overview.component';
import { CreateLessonComponent } from './create-lesson/create-lesson.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    NavbarComponent,
    CourseOverviewComponent,
    CreateLessonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
