import * as React from 'react';
import { SignIn, CredentialsInput, ReactElement } from 'core/models';
import { StyledInput, StyledForm, StyledFormGroup } from 'components';

interface Props {
  onSubmit: ({ username, password }: SignIn) => Promise<void>;
  submitButton: ReactElement;
}

function LoginForm({ onSubmit, submitButton }: Props) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const target = event.target as typeof event.target & CredentialsInput;

    onSubmit({
      username: target.username.value,
      password: target.password.value,
    });
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledFormGroup>
        <label htmlFor="username">username</label>
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
