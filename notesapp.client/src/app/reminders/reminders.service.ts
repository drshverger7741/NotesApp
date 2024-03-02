// reminders.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reminder } from '../models/models'; // Убедитесь, что у вас есть модель Reminder

@Injectable({
  providedIn: 'root'
})
export class RemindersService {
  private apiUrl = 'https://localhost:7236/api/reminders';

  constructor(private http: HttpClient) { }

  getReminders(): Observable<Reminder[]> {
    return this.http.get<Reminder[]>(this.apiUrl);
  }

  getReminder(id: number): Observable<Reminder> {
    return this.http.get<Reminder>(`${this.apiUrl}/${id}`);
  }

  createReminder(reminder: Reminder): Observable<Reminder> {
    return this.http.post<Reminder>(this.apiUrl, reminder);
  }

  updateReminder(reminder: Reminder): Observable<Reminder> {
    return this.http.put<Reminder>(`${this.apiUrl}/${reminder.id}`, reminder);
  }

  deleteReminder(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
