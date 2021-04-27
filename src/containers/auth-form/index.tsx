/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { CredentialsInput, ReactElement } from 'core/models';
import {
  StyledInput,
  StyledForm,
  StyledFormGroup,
  ErrorMessage,
  Spinner,
} from 'components';
import { useAsync } from 'core/hooks';

interface Props {
  onSubmit: any;
  submitButton: ReactElement;
}

function AuthForm({ onSubmit, submitButton }: Props) {
  const { isLoading, isError, error, run } = useAsync();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const target = event.target as typeof event.target & CredentialsInput;
    const username = target.username.value;
    const password = target.password.value;

    run(onSubmit(username, password));
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
      <div>
        {React.cloneElement(
          submitButton,
          { type: 'submit' },
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
          isLoading ? <Spinner css={{ marginLeft: 5 }} /> : null,
        )}
      </div>
      {isError ? <ErrorMessage error={error} /> : null}
    </StyledForm>
  );
}

export { AuthForm };
