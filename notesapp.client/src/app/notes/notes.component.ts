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
    status: false,
    dateCreate: new Date(),
    dateToNeedComlete: new Date(),
    tags: [],
    reminderId: 0
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
      // Обновление существующей заметки
      this.updateNote(this.newNote);
    } else {
      // Создание новой заметки
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
  //openModal(template: TemplateRef<any>) {
  //  this.modalRef = this.modalService.show(template);
  //}

  openModal(template: TemplateRef<any>, note?: Note): void {
    if (note) {
      // Заполняем форму данными заметки для редактирования
      this.newNote = { ...note };
      // Используем оператор || для предоставления пустого массива, если note.tags не определен
      this.selectedTags = note.tags || [];
    } else {
      // Очищаем форму для создания новой заметки
      // Сброс newNote и selectedTags после сохранения
      this.newNote = {
        id: 0,
        title: '',
        content: '',
        status: false,
        dateCreate: new Date(),
        dateToNeedComlete: new Date(),
        tags: [],
        reminderId: 0
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
