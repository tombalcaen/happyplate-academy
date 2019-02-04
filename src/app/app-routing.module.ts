import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CourseComponent} from './course/course.component';
import {CourseOverviewComponent} from './course-overview/course-overview.component';
import {CreateLessonComponent} from './create-lesson/create-lesson.component';
import {EditLessonComponent} from './edit-lesson/edit-lesson.component';
import {EditorComponent} from './editor/editor.component';
import { BlogComponent } from './blog/blog.component';
import { ArticleComponent } from './article/article.component';
import { RecipeComponent } from './recipe/recipe.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { CreateArticleComponent } from './create-article/create-article.component';

const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: 'courses',  component: CourseOverviewComponent },
  { path: 'course/:id',  component: CourseComponent },
  { path: 'editor',  component: EditorComponent },
  { path: 'create-lesson/:chId',  component: CreateLessonComponent },
  { path: 'edit-lesson/:_id',  component: EditLessonComponent },
  { path: 'blog',  component: BlogComponent },
  { path: 'article/:_id',  component: ArticleComponent },
  { path: 'recipe/:_id',  component: RecipeComponent },
  { path: 'create_recipe',  component: CreateRecipeComponent },
  { path: 'create_article',  component: CreateArticleComponent },
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
