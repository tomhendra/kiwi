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
  projects: unknown[]; // ref
  issues: unknown[]; // ref
  created: Date;
  permissions: 'USER' | 'ADMIN_USER';
  agreedToTerms: boolean;
  agreedToPrivacyPolicy: boolean;
}
