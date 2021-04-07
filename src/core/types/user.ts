export interface Auth {
  username: string;
  password: string;
}

export interface AuthInput {
  username: { value: string };
  password: { value: string };
}

export interface User {
  username: string;
  password: string;
  email: string;
  projects: unknown[]; // ref
  issues: unknown[]; // ref
  created: Date;
  permissions: 'USER' | 'ADMIN_USER';
  agreedToTerms: boolean;
  agreedToPrivacyPolicy: boolean;
}
