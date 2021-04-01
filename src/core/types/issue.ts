import { User } from './user';

export interface Issue {
  assignee: User; // ref
  attachments: unknown[]; // ref
  created: Date;
  description: string;
  flags: unknown[]; // ref
  labels: unknown[]; // ref
  linkedIssues: unknown[]; // ref
  name: string;
  priority: 'LOW' | 'MEDIUM' | 'URGENT';
  project: unknown; // ref
  reporter: User; // ref
  estimate: number; // ref
  status: 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'DONE' | 'ARCHIVED';
  type: 'TASK' | 'BUG';
}
