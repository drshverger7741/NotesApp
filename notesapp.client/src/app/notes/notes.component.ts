// notes.component.ts
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NotesService } from './notes.service';
import { Note, Tag } from '../models';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TagsService } from '../tags/tags.service';

@Component({
 selector: 'app-notes',
 templateUrl: './notes.component.html',
 styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  modalRef!: BsModalRef;
  notes: any[] = []; // Предполагается, что у вас есть массив записок
  selectedNote: any = {}; // Объект для хранения выбранной заметки
  tags: Tag[] = [];
  selectedTags: string[] = [];
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

  constructor(private notesService: NotesService, private tagsService: TagsService, private modalService: BsModalService) { }

 ngOnInit(): void {
   this.getNotes();
   this.getTags(); // Добавьте эту строку
  }

  getTags(): void {
   this.tagsService.getTags().subscribe(tags => this.tags = tags);
  }

 getNotes(): void {
    this.notesService.getNotes().subscribe(notes => this.notes = notes);
 }

  createNote(): void {
    // Добавление выбранных тегов в newNote перед сохранением
    this.newNote.tags = this.selectedTags;

    this.notesService.createNote(this.newNote).subscribe(note => {
      this.notes.push(note);
      // Сброс newNote и selectedTags после сохранения
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
      this.selectedTags = [];
      this.closeModal();
    });
  }

  addTag(tag: Tag): void {
    if (!this.selectedTags.includes(tag.name)) {
      this.selectedTags.push(tag.name);
    }
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide();
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
