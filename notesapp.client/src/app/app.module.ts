import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { TagsComponent } from './tags/tags.component';
import { RemindersComponent } from './reminders/reminders.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    TagsComponent,
    RemindersComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
