import * as React from 'react';
import { Auth, AuthInput, ReactElement } from 'core/models';
import { StyledInput, StyledForm, StyledFormGroup } from 'components';

interface Props {
  onSubmit: ({ email, password }: Auth) => void;
  submitButton: ReactElement;
}

function LoginForm({ onSubmit, submitButton }: Props) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const target = event.target as typeof event.target & AuthInput;

    onSubmit({
      email: target.email.value,
      password: target.password.value,
    });
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledFormGroup>
        <label htmlFor="email">email</label>
        <StyledInput id="email" type="text" />
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
