// reminders.component.ts
import { Component, OnInit } from '@angular/core';
import { RemindersService } from './reminders.service';
import { Reminder } from '../models'; 
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {
  selectedReminder: Reminder | null = null;
  tempReminder: Reminder | null = null;
  reminders: Reminder[] = [];
  newReminder: Reminder = {
    id: 0,
    name: '',
    dateToNeedComleteReminder: new Date(),
  };


  constructor(private remindersService: RemindersService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getReminders();
  }

  getReminders(): void {
    this.remindersService.getReminders().subscribe(reminders => this.reminders = reminders);
  }

  createReminder(): void {
    if (this.newReminder.name.trim().length > 0) {
      this.remindersService.createReminder(this.newReminder).subscribe(() => {
        this.getReminders(); 
        this.newReminder = {
          id: 0,
          name: '',
          dateToNeedComleteReminder: new Date(),
        }; 
        this.selectedReminder = null; 
      });
      this.snackBar.open('Напоминание успешно добавлено.', 'OK', {
        duration: 1500,
      });
    }
    else {
      this.snackBar.open('Введите заголовок напоминания.', 'OK', {
        duration: 1500,
      });
    }
  }

  updateReminder(reminder: Reminder | null): void {
    if (reminder) {
      this.remindersService.updateReminder(reminder.id, reminder).subscribe(() => {
        this.getReminders(); 
        this.cancelEdit(); 
      });
    }
  }
  

  deleteReminder(id: number): void {
    this.remindersService.deleteReminder(id).subscribe(() => {
      this.reminders = this.reminders.filter(reminder => reminder.id !== id);
    });
  }

  selectReminderForEdit(reminder: Reminder): void {
    this.selectedReminder = reminder;
    this.tempReminder = { ...reminder };

  }

  cancelEdit(): void {
    this.selectedReminder = null;
    this.tempReminder = null;
  }


}
