// reminders.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Reminder } from '../models'; // Убедитесь, что у вас есть модель Reminder

@Injectable({
  providedIn: 'root'
})
export class RemindersService {
  private apiUrl = 'http://localhost:5047/api/reminders';
  private reminders = new BehaviorSubject<string[]>([]);

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

  updateReminder(id: number, reminder: Reminder): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, reminder);
  }

  deleteReminder(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
