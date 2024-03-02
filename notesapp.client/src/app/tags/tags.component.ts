// tags.component.ts
import { Component, OnInit } from '@angular/core';
import { TagsService } from './tags.service';
import { Tag } from '../models/models';

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
    notes: [] // Если вы хотите включить связи с заметками в модель, убедитесь, что это соответствует вашей логике
  };

  constructor(private tagsService: TagsService) { }

  ngOnInit(): void {
    this.getTags();
  }

  getTags(): void {
    this.tagsService.getTags().subscribe(tags => this.tags = tags);
  }

  createTag(): void {
    this.tagsService.createTag(this.newTag).subscribe(tag => {
      this.tags.push(tag);
      this.newTag = {
        id: 0,
        name: '',
        notes: []// Notes: [] // Сбросьте связи с заметками, если они есть
      };
    });
  }

  updateTag(tag: Tag): void {
    this.tagsService.updateTag(tag).subscribe(updatedTag => {
      const index = this.tags.findIndex(t => t.id === updatedTag.id);
      if (index !== -1) {
        this.tags[index] = updatedTag;
      }
    });
  }

  deleteTag(id: number): void {
    this.tagsService.deleteTag(id).subscribe(() => {
      this.tags = this.tags.filter(tag => tag.id !== id);
    });
  }
}
