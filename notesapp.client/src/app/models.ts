export interface Note {
  id: number;
  title: string;
  content: string;
  status: boolean;
  dateCreate: Date;
  dateToNeedComlete: Date;
  tags?: string[];
  reminderId?: number;
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

