import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CourseComponent} from './course/course.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '',  component: CourseComponent },
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
