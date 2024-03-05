import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
/*  title = 'NotesApp';*/

  // Определение навигационных ссылок для вкладок
  //navLinks = [
  //  { path: '/notes', label: 'Заметки' },
  //  { path: '/tags', label: 'Тэги' },
  //  { path: '/reminders', label: 'Напоминания' },
  //];

  navLinks = [
    { label: 'Заметки', path: '/notes', isActive: true, isDisabled: false },
    { label: 'Тэги', path: '/tags', isActive: false, isDisabled: false },
    { label: 'Напоминания', path: '/reminders', isActive: false, isDisabled: false }
  ];

  constructor(private router: Router) {
    // Вы можете использовать Router для определения активной ссылки
    this.router.events.subscribe(event => {
      this.navLinks.forEach(link => {
        link.isActive = this.router.url === link.path;
      });
    });
  }
}
