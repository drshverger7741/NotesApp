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
  selectedReminder: Reminder | null = null;
  tempReminder: Reminder | null = null;
  reminders: Reminder[] = [];
  newReminder: Reminder = {
    id: 0,
    name: '',
    dateToNeedComleteReminder: new Date(),
  };

  constructor(private remindersService: RemindersService) { }

  ngOnInit(): void {
    this.getReminders();
  }

  getReminders(): void {
    this.remindersService.getReminders().subscribe(reminders => this.reminders = reminders);
  }

  //createReminder(): void {
  //  this.remindersService.createReminder(this.newReminder).subscribe(reminder => {
  //    this.reminders.push(reminder);
  //    this.newReminder = {
  //      id: 0,
  //      name: '',
  //      dateToNeedComleteReminder: new Date(),
  //      // Сбросьте другие свойства, если они есть в вашей модели
  //    };
  //  });
  //}

  createReminder(): void {
    this.remindersService.createReminder(this.newReminder).subscribe(() => {
      this.getReminders(); // Обновляем список напоминаний после создания нового
      this.newReminder = {
        id: 0,
        name: '',
        dateToNeedComleteReminder: new Date(),
      }; // Сбрасываем форму добавления
      this.selectedReminder = null; // Сбрасываем выбранное напоминание и форму редактирования
    });
  }

  updateReminder(reminder: Reminder | null): void {
    if (reminder) {
      this.remindersService.updateReminder(reminder.id, reminder).subscribe(() => {
        this.getReminders(); // Обновляем список напоминаний после обновления
        this.cancelEdit(); // Сбрасываем выбранное напоминание и форму редактирования
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
    this.tempReminder = { ...reminder }; // Создаем копию напоминания для редактирования
  }

  cancelEdit(): void {
    this.selectedReminder = null;
    this.tempReminder = null;
  }


}
