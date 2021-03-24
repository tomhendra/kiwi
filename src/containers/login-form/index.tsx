import * as React from 'react';
import { Auth, ReactElement } from 'core/types';
import { StyledInput, StyledForm, StyledFormGroup } from './styled';

interface Props {
  onSubmit: ({ username, password }: Auth) => void;
  submitButton: ReactElement;
}

function LoginForm({ onSubmit, submitButton }: Props) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Type widening
    const target = event.target as typeof event.target & {
      username: { value: string };
      password: { value: string };
    };

    const username = target.username;
    const password = target.password;

    onSubmit({
      username: username.value,
      password: password.value,
    });
  }
  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledFormGroup>
        <label htmlFor="username">Username</label>
        <StyledInput id="username" type="text" />
      </StyledFormGroup>
      <StyledFormGroup>
        <label htmlFor="password">Password</label>
        <StyledInput id="password" type="password" />
      </StyledFormGroup>
      <div>{React.cloneElement(submitButton, { type: 'submit' })}</div>
    </StyledForm>
  );
}

export { LoginForm };
