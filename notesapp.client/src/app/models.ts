export interface Note {
  id: number;
  title: string;
  content: string;
  dateCreate: Date;
  dateToNeedComlete: Date;
  tags?: string[];
}

export interface Reminder {
  id: number;
  name: string;
  dateToNeedComleteReminder: Date;
}

export interface Tag {
  id: number;
  name: string;
}

