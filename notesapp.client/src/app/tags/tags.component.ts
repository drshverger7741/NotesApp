// tags.component.ts
import { Component, OnInit } from '@angular/core';
import { TagsService } from './tags.service';
import { Tag } from '../models';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags: Tag[] = [];
  newTag: Tag = {
    id: 0,
    name: '',
  };

  constructor(private tagsService: TagsService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getTags();
  }

  getTags(): void {
    this.tagsService.getTags().subscribe(tags => this.tags = tags);
  }

  createTag(): void {
    // Проверяем, что имя тега не пустое
    if (this.newTag.name.trim().length > 0) {
      // Проверяем, существует ли уже тег с таким именем
      const tagExists = this.tags.some(tag => tag.name.toLowerCase() === this.newTag.name.toLowerCase());
      if (!tagExists) {
        this.tagsService.createTag(this.newTag).subscribe(tag => {
          this.tags.push(tag);
          // Сброс нового тега
          this.newTag = {
            id: 0,
            name: '',
          };
        });
        this.snackBar.open('Тег успешно добавлен.', 'OK', {
          duration: 1500,
        });
      } else {
        // Обработка случая, когда тег с таким именем уже существует
        this.snackBar.open('Тег с таким именем уже существует.', 'OK', {
          duration: 1500,
        });
      }
    } else {
      // Обработка случая, когда имя тега пустое
      this.snackBar.open('Имя тега не может быть пустым.', 'OK', {
        duration: 1500,
      });
    }
  }



  deleteTag(id: number): void {
    this.tagsService.deleteTag(id).subscribe(() => {
      this.tags = this.tags.filter(tag => tag.id !== id);
    });
  }
}
