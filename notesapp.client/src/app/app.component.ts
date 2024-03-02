import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NotesApp';

  // Определение навигационных ссылок для вкладок
  navLinks = [
    { path: '/notes', label: 'Заметки' },
    { path: '/tags', label: 'Тэги' },
    { path: '/reminders', label: 'Напоминания' },
  ];

  constructor() { }
}
