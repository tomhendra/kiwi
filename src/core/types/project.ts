import { User } from './user';

export interface project {
  assignee: User;
  created: Date;
  description: string;
  icon: unknown; // image type ??
  issues: unknown[]; // ref
  key: string;
  lead: User;
  name: string;
}
