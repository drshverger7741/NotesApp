export interface Note {
  id: number;
  title: string;
  content: string;
  status: boolean;
  dateCreate: Date;
  dateToNeedComlete: Date;
  tags: Tag[]; // Убедитесь, что тип Tag также объявлен
  reminder?: Reminder; // Убедитесь, что тип Reminder также объявлен
}

export interface Reminder {
  id: number;
  name: string;
  dateToNeedComleteReminder: Date;
  noteId?: number;
  note?: Note;
}

export interface Tag {
  id: number;
  name: string;
  notes: []; // Массив идентификаторов заметок, связанных с тегом
}

