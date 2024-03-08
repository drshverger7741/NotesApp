// notes.component.ts
import { Component, OnInit } from '@angular/core';
import { NotesService } from './notes.service';
import { Note } from '../models';



@Component({
 selector: 'app-notes',
 templateUrl: './notes.component.html',
 styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];

  constructor(private notesService: NotesService) {
  }

 ngOnInit(): void {
   this.notesService.getNotes().subscribe(data => this.notes = data);
  }


  onInitNewRow(e: any) {
    // Устанавливаем начальные значения для новой записи
    e.data.status = false; // Предполагаем, что поле status имеет булево значение
    e.data.dateCreate = new Date(); // Устанавливаем текущую дату и время для поля dateCreate
    // Добавьте здесь другие начальные значения, если это необходимо
  }


  onRowUpdated(e: any) {
    const updatedNote = e.data;
    this.notesService.updateNote(updatedNote).subscribe(note => {
      // Обновляем запись в локальном массиве после успешного обновления на сервере
      const index = this.notes.findIndex(n => n.id === note.id);
      if (index !== -1) {
        this.notes[index] = note;
      }
    });
  }

  onRowRemoving(e: any) {
    const noteId = e.data.id;
    this.notesService.deleteNote(noteId).subscribe(() => {
      // Удаляем запись из локального массива после успешного удаления на сервере
      this.notes = this.notes.filter(note => note.id !== noteId);
    });
  }

  onRowInserted(e: any) {
    const newNote = e.data;
    this.notesService.createNote(newNote).subscribe(note => {
      // Добавляем новую запись в локальный массив после успешного добавления на сервере
      this.notes.push(note);
    });
  }
}
