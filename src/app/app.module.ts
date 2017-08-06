import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownModule } from 'angular2-markdown';
import { StickyModule } from 'ng2-sticky-kit/ng2-sticky-kit';

import { AppComponent } from './app.component';

// Import Routes
import {
  HomeRoute,
  ProjectsRoute,
  ProjectDetailRoute,
  AboutRoute
} from './routes';

// Import Services
import {
  ProjectProvider
} from './services/project-provider/project-provider.service';

// Import Components
import {
  ProjectListComponent,
  TagListComponent,
  ProjectFormComponent,
  TagInputComponent,
  MultiInputComponent
} from './components';

// Import Pipes
import {
  SortByTagsPipe,
  SortByTextPipe
} from './pipes';

// Hammer js for mobile
import 'hammerjs';

// Routes configuration
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    component: HomeRoute
  },
  {
    path: 'projects',
    component: ProjectsRoute
  },
  {
    path: 'projects/:id',
    component: ProjectDetailRoute
  },
  {
    path: 'new',
    component: ProjectFormComponent
  },
  {
    path: 'about',
    component: AboutRoute
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/home'
  }
];

@NgModule({
  declarations: [
    // Root
    AppComponent,
    // Routes
    HomeRoute,
    ProjectsRoute,
    ProjectDetailRoute,
    AboutRoute,
    // Components
    ProjectListComponent,
    TagListComponent,
    ProjectFormComponent,
    TagInputComponent,
    MultiInputComponent,
    // Pipes
    SortByTagsPipe,
    SortByTextPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(routes),
    MarkdownModule.forRoot(),
    StickyModule,
    FormsModule,
  ],
  providers: [
    ProjectProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
