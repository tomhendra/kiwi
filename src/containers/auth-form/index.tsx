/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { ReactElement } from 'core/models/react';
import {
  StyledInput,
  StyledForm,
  StyledFormGroup,
  ErrorMessage,
  Spinner,
} from 'components';
import { useAsync } from 'core/hooks';
// ? https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/
interface FormElements extends HTMLFormControlsCollection {
  usernameInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
  emailInput: HTMLInputElement;
  codeInput: HTMLInputElement;
}

interface AuthFormElements extends HTMLFormElement {
  // now we can override the elements type to be an HTMLFormControlsCollection
  // of our own design...
  readonly elements: FormElements;
}

interface Props {
  onSubmit: (username: string, password: string) => void;
  submitButton: ReactElement;
}

function AuthForm({ onSubmit, submitButton }: Props) {
  const { isLoading, isError, error, run } = useAsync();

  function handleSubmit(event: React.FormEvent<AuthFormElements>) {
    event.preventDefault();
    const { usernameInput, passwordInput } = event.currentTarget.elements;
    run(onSubmit(usernameInput.value, passwordInput.value));
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
