// reminders.component.ts
import { Component, OnInit } from '@angular/core';
import { RemindersService } from './reminders.service';
import { Reminder } from '../models'; // Убедитесь, что у вас есть модель Reminder

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {
  reminders: Reminder[] = [];
  newReminder: Reminder = {
    id: 0,
    name: '',
    dateToNeedComleteReminder: new Date(),
    // Добавьте другие свойства, если они есть в вашей модели
  };

  constructor(private remindersService: RemindersService) { }

  ngOnInit(): void {
    this.getReminders();
  }

  getReminders(): void {
    this.remindersService.getReminders().subscribe(reminders => this.reminders = reminders);
  }

  createReminder(): void {
    this.remindersService.createReminder(this.newReminder).subscribe(reminder => {
      this.reminders.push(reminder);
      this.newReminder = {
        id: 0,
        name: '',
        dateToNeedComleteReminder: new Date(),
        // Сбросьте другие свойства, если они есть в вашей модели
      };
    });
  }

  updateReminder(reminder: Reminder): void {
    this.remindersService.updateReminder(reminder).subscribe(updatedReminder => {
      const index = this.reminders.findIndex(r => r.id === updatedReminder.id);
      if (index !== -1) {
        this.reminders[index] = updatedReminder;
      }
    });
  }

  deleteReminder(id: number): void {
    this.remindersService.deleteReminder(id).subscribe(() => {
      this.reminders = this.reminders.filter(reminder => reminder.id !== id);
    });
  }
}
