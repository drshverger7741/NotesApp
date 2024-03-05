import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrl: './note-dialog.component.css'
})
export class NoteDialogComponent {
  newNote = {
    id: 0,
    title: '',
    content: '',
    status: false,
    dateCreate: new Date(),
    dateToNeedComlete: new Date(),
    tags: [],
    reminder: undefined
  };

  constructor(public dialogRef: MatDialogRef<NoteDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
