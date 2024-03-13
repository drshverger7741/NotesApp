import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './notes/notes.component';
import { TagsComponent } from './tags/tags.component';
import { RemindersComponent } from './reminders/reminders.component';

const routes: Routes = [
  { path: 'notes', component: NotesComponent },
  { path: 'tags', component: TagsComponent },
  { path: 'reminders', component: RemindersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
