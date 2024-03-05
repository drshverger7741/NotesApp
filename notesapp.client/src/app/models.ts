export interface Note {
  id: number;
  title: string;
  content: string;
  status: boolean;
  dateCreate: Date;
  dateToNeedComlete: Date;
  tags: Tag[];
  reminder?: Reminder;
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
  notes: [];
}

