import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseComponent } from './course/course.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CourseOverviewComponent } from './course-overview/course-overview.component';
import { CreateLessonComponent } from './create-lesson/create-lesson.component';
import { EditorComponent } from './editor/editor.component';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';
import { BlogComponent } from './blog/blog.component';
import { ArticleComponent } from './article/article.component';
import { RecipeComponent } from './recipe/recipe.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { BlogNavbarComponent } from './blog-navbar/blog-navbar.component';
import { BlogFooterComponent } from './blog-footer/blog-footer.component';
import { CreateArticleComponent } from './create-article/create-article.component';

//third party editor
import { QuillModule } from 'ngx-quill';
import { RecipesComponent } from './recipes/recipes.component';
import { ArticlesComponent } from './articles/articles.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    NavbarComponent,
    CourseOverviewComponent,
    CreateLessonComponent,
    EditorComponent,
    EditLessonComponent,
    BlogComponent,
    ArticleComponent,
    RecipeComponent,
    CreateRecipeComponent,
    BlogNavbarComponent,
    BlogFooterComponent,
    CreateArticleComponent,
    RecipesComponent,
    ArticlesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    QuillModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
