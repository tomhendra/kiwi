import * as React from 'react';
import { Auth, AuthInput, ReactElement } from 'core/types';
import { StyledInput, StyledForm, StyledFormGroup } from 'components';

interface Props {
  onSubmit: ({ username, password }: Auth) => void;
  submitButton: ReactElement;
}

function LoginForm({ onSubmit, submitButton }: Props) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const target = event.target as typeof event.target & AuthInput;

    onSubmit({
      username: target.username.value,
      password: target.password.value,
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
