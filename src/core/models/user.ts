import { Item, Project } from './api';

export interface SignIn {
  username: string;
  password: string;
}

export interface SignUp extends SignIn {
  email: string;
}

export interface CredentialsInput {
  username: { value: string };
  password: { value: string };
  email: { value: string };
  code: { value: string };
}

export interface User {
  username: string;
  email: string;
  password: string;
  projects: Project[];
  items: Item[];
}
