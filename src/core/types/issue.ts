import { User } from './user';

export interface Issue {
  assignee: User; // ref
  attachments: unknown[]; // ref
  date: Date;
  description: string;
  deleted: boolean;
  tags: unknown[]; // ref
  name: string;
  priority: 'LOW' | 'MEDIUM' | 'URGENT';
  project: unknown; // ref
  reporter: User; // ref
  estimate: number; // ref
  status: 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'DONE' | 'ARCHIVED';
  type: 'TASK' | 'BUG';
}

export interface IssueForm {
  assignee: { value: User };
  attachments: { value: unknown[] };
  date: { value: Date };
  description: { value: string };
  tags: { value: unknown[] };
  name: { value: string };
  priority: { value: 'LOW' | 'MEDIUM' | 'URGENT' };
  project: { value: unknown };
  reporter: { value: User };
  estimate: { value: number };
  status: { value: 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'DONE' | 'ARCHIVED' };
  type: { value: 'TASK' | 'BUG' };
}
