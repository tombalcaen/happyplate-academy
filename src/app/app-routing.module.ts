import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CourseComponent} from './course/course.component';
import {CourseOverviewComponent} from './course-overview/course-overview.component';
import {CreateLessonComponent} from './create-lesson/create-lesson.component';
import {EditorComponent} from './editor/editor.component';

const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: 'courses',  component: CourseOverviewComponent },
  { path: 'course/:id',  component: CourseComponent },
  { path: 'editor',  component: EditorComponent },
  { path: 'create-lesson',  component: CreateLessonComponent },
  
  // { path: 'login',  component: LoginComponent },
  // { path: 'emailverify',  component: EmailVerifyComponent },
  // { path: 'register',  component: RegisterComponent },
  // { path: 'about', component: AboutComponent},
  // { path: 'living',  component: LivingComponent,
  //   children: [
  //     { path: 'general/:key',  component: GeneralComponent, canActivate: [AuthGuardService] },
  //     { path: 'calendar/:key',  component: CalendarComponentClass, canActivate: [AuthGuardService] },
  //   ]
  // }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
