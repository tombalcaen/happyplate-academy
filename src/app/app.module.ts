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
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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
import { RecipeWidgetComponent } from './recipe-widget/recipe-widget.component';
import { ArticleWidgetComponent } from './article-widget/article-widget.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { JwtModule,JwtHelperService } from '@auth0/angular-jwt';
import { ProfileComponent } from './profile/profile.component';
import { CreateHealthProfileComponent } from './create-health-profile/create-health-profile.component';

export function tokenGetter() {
  return localStorage.getItem('id_token');
}

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
    ArticlesComponent,
    RecipeWidgetComponent,
    ArticleWidgetComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CreateHealthProfileComponent
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
    MatTooltipModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatRippleModule,
    MatCardModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    QuillModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['localhost:3000/auth/']
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
