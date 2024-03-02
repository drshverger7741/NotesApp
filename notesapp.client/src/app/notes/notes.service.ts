import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private apiUrl = 'https://localhost:7236/api/Notes';

  constructor(private http: HttpClient) { }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }

  getNote(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/${id}`);
  }

  createNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note);
  }

  updateNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/${note.id}`, note);
  }

  deleteNote(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
