import { Item, Project } from './api';

export interface Auth {
  email: string;
  password: string;
}

export interface AuthInput {
  email: { value: string };
  password: { value: string };
}

export interface User {
  email: string;
  password: string;
  projects: Project[];
  items: Item[];
}
