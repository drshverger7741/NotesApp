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
    this.remindersService.getReminders().subscribe(data => this.reminders = data);
  }


  onInitNewRow(e: any) {

  }


  onRowUpdated(e: any) {
    const updatedReminder = e.data;
    this.remindersService.updateReminder(updatedReminder).subscribe(reminder => {
      // Обновляем запись в локальном массиве после успешного обновления на сервере
      const index = this.reminders.findIndex(n => n.id === reminder.id);
      if (index !== -1) {
        this.reminders[index] = reminder;
      }
    });
  }

  onRowRemoving(e: any) {
    const reminderId = e.data.id;
    this.remindersService.deleteReminder(reminderId).subscribe(() => {
      // Удаляем запись из локального массива после успешного удаления на сервере
      this.reminders = this.reminders.filter(reminder => reminder.id !== reminderId);
    });
  }

  onRowInserted(e: any) {
    const newReminder = e.data;
    this.remindersService.createReminder(newReminder).subscribe(reminder => {
      // Добавляем новую запись в локальный массив после успешного добавления на сервере
      this.reminders.push(reminder);
    });
  }
}
