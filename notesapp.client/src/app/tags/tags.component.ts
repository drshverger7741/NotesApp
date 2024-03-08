// tags.component.ts
import { Component, OnInit } from '@angular/core';
import { TagsService } from './tags.service';
import { Tag } from '../models';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags: Tag[] = [];


  constructor(private tagsService: TagsService) { }

  ngOnInit(): void {
    this.tagsService.getTags().subscribe(data => this.tags = data);
  }

  onInitNewRow(e: any) {
    // Устанавливаем начальные значения для новой записи
    // Добавьте здесь другие начальные значения, если это необходимо
  }


  onRowUpdated(e: any) {
    const updatedTag = e.data;
    this.tagsService.updateTag(updatedTag).subscribe(tag => {
      // Обновляем запись в локальном массиве после успешного обновления на сервере
      const index = this.tags.findIndex(n => n.id === tag.id);
      if (index !== -1) {
        this.tags[index] = tag;
      }
    });
  }

  onRowRemoving(e: any) {
    const tagId = e.data.id;
    this.tagsService.deleteTag(tagId).subscribe(() => {
      // Удаляем запись из локального массива после успешного удаления на сервере
      this.tags = this.tags.filter(tag => tag.id !== tagId);
    });
  }

  onRowInserted(e: any) {
    const newTag = e.data;
    this.tagsService.createTag(newTag).subscribe(note => {
      // Добавляем новую запись в локальный массив после успешного добавления на сервере
      this.tags.push(note);
    });
  }
}
