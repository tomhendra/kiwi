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
}

export interface User {
  email: string;
  password: string;
  projects: Project[];
  items: Item[];
}
