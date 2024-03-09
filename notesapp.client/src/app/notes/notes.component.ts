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
  notes: Note[] = []; // Предполагается, что у вас есть массив записок
  selectedNote: any = {}; // Объект для хранения выбранной заметки
  tags: Tag[] = [];
  selectedTags: string[] = [];
  newNote: Note = {
    id: 0,
    title: '',
    content: '',
    dateCreate: new Date(),
    dateToNeedComlete: new Date(),
    tags: []
  };

  constructor(private notesService: NotesService, private tagsService: TagsService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getNotes();
    this.getTags();
  }

  getTags(): void {
    this.tagsService.getTags().subscribe(tags => this.tags = tags);
  }

  getNotes(): void {
    this.notesService.getNotes().subscribe(notes => this.notes = notes);
  }

  createNote(): void {
    this.newNote.tags = this.selectedTags;
    this.notesService.createNote(this.newNote).subscribe(note => {
      this.notes.push(note);
    });
  }

  updateNote(note: Note): void {
    note.tags = this.selectedTags;
    this.notesService.updateNote(note).subscribe(updatedNote => {
      const index = this.notes.findIndex(n => n.id === updatedNote.id);
      if (index !== -1) {
        this.notes[index] = updatedNote;
      }
    });
  }

  saveNote(): void {
    if (this.newNote.id) {
      this.updateNote(this.newNote);
    } else {
      this.createNote();
    }
    this.closeModal();
  }


  addTag(tag: Tag): void {
    if (!this.selectedTags.includes(tag.name)) {
      this.selectedTags.push(tag.name);
    }
  }
  deleteTag(tag: string): void {
    this.selectedTags = this.selectedTags.filter(t => t !== tag);
  }

  openModal(template: TemplateRef<any>, note?: Note): void {
    if (note) {
      this.newNote = { ...note };
      this.selectedTags = note.tags || [];
    }
    else {
      this.newNote = {
        id: 0,
        title: '',
        content: '',
        dateCreate: new Date(),
        dateToNeedComlete: new Date(),
        tags: []
      };
      this.selectedTags = [];
    }
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide();
  }
  deleteNote(id: number): void {
    this.notesService.deleteNote(id).subscribe(() => {
      this.notes = this.notes.filter(note => note.id !== id);
    });
  }


}
