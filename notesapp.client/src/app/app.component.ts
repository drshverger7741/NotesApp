import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NotesApp';

  // Определение навигационных ссылок для вкладок
  navLinks = [
    { label: 'Заметки', path: '/notes' },
    { label: 'Тэги', path: '/tags' },
    { label: 'Напоминания', path: '/reminders' },
    // другие ссылки
  ];

  currentRoute = '/notes'; // начальный маршрут

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }
}
