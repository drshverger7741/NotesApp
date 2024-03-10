import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  navLinks = [
    { label: 'Заметки', path: '/notes', isActive: true },
    { label: 'Тэги', path: '/tags', isActive: false },
    { label: 'Напоминания', path: '/reminders', isActive: false }
  ];

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      this.navLinks.forEach(link => {
        link.isActive = this.router.url === link.path;
      });
    });
  }
}
