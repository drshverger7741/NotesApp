// notes.component.ts
import { Component, OnInit } from '@angular/core';
import { NotesService } from './notes.service';
import { Note } from '../models/models';

@Component({
 selector: 'app-notes',
 templateUrl: './notes.component.html',
 styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
 notes: Note[] = [];
 newNote: Note = {
    id: 0,
    title: '',
    content: '',
    status: false,
    dateCreate: new Date(),
    dateToNeedComlete: new Date(),
   tags: [],
   reminder: undefined
 };

 constructor(private notesService: NotesService) { }

 ngOnInit(): void {
    this.getNotes();
 }

 getNotes(): void {
    this.notesService.getNotes().subscribe(notes => this.notes = notes);
 }

 createNote(): void {
    this.notesService.createNote(this.newNote).subscribe(note => {
        this.notes.push(note);
        this.newNote = {
            id: 0,
            title: '',
            content: '',
            status: false,
            dateCreate: new Date(),
            dateToNeedComlete: new Date(),
            tags: [],
            reminder: undefined
        };
    });
 }

 updateNote(note: Note): void {
    this.notesService.updateNote(note).subscribe(updatedNote => {
        const index = this.notes.findIndex(n => n.id === updatedNote.id);
        if (index !== -1) {
            this.notes[index] = updatedNote;
        }
    });
 }

 deleteNote(id: number): void {
    this.notesService.deleteNote(id).subscribe(() => {
        this.notes = this.notes.filter(note => note.id !== id);
    });
 }
}
