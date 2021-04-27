/** @jsxImportSource @emotion/react */
import * as React from 'react';
import {
  Layout,
  Button,
  StyledInput,
  StyledForm,
  StyledFormGroup,
  ErrorMessage,
  Spinner,
} from 'components';
import { useAsync } from 'core/hooks';
import { CredentialsInput } from 'core/models';

// interface AuthState {
//   username: string;
//   password: string;
//   email: string;
//   code: string;
//   phase: 'signUp' | 'confirm' | 'signIn'
// }

// const initialFormState: AuthState = {
//   username: '',
//   password: '',
//   email: '',
//   code: '',
//   phase: 'signUp',
// };

// TODO: types for Amplify auth ??
interface Props {
  signIn: any;
  signUp: any;
  confirmSignUp: any;
}

function UnauthenticatedApp({ signIn, signUp, confirmSignUp }: Props) {
  //   React.useEffect(() => {
  //     setAuthListener();
  //   }, []);

  //   async function setAuthListener() {
  //     Hub.listen('auth', data => {
  //       switch (data.payload.event) {
  //         case 'signOut':
  //           console.log({ data });
  //           updateFormState(() => ({ ...formState, formType: 'signUp' }));
  //           break;
  //         default:
  //           break;
  //       }
  //     });
  //   }

  const [authState, setAuthState] = React.useState('signIn');
  const { isLoading, isError, error, run } = useAsync();

  function handleAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const target = event.target as typeof event.target & CredentialsInput;
    const username = target.username.value;
    const password = target.password.value;
    const email = authState === 'signUp' ? target.email.value : null;
    const code = authState === 'confirm' ? target.code.value : null;

    if (authState === 'signIn') {
      run(signIn(username, password));
    }

    if (authState === 'signUp') {
      run(signUp(username, password, email));
      setAuthState('confirm');
    }

    if (authState === 'confirm') {
      run(confirmSignUp(username, code));
      setAuthState('signIn');
    }
  }

  function toggleAuthState() {
    setAuthState(() => (authState === 'signIn' ? 'signUp' : 'signIn'));
  }

  return (
    <Layout>
      <h1>Búho</h1>
      <StyledForm onSubmit={handleAuth}>
        <StyledFormGroup>
          <label htmlFor="username">username</label>
          <StyledInput id="username" type="text" />
        </StyledFormGroup>
        <StyledFormGroup>
          <label htmlFor="password">Password</label>
          <StyledInput id="password" type="password" />
        </StyledFormGroup>
        {/* render input for email if signing up */}
        {authState === 'signUp' ? (
          <StyledFormGroup>
            <label htmlFor="email">Email</label>
            <StyledInput id="email" type="email" />
          </StyledFormGroup>
        ) : null}
        {/* render input for confirmation if confirming sign up */}
        {authState === 'confirm' ? (
          <StyledFormGroup>
            <label htmlFor="code">confirmation code</label>
            <StyledInput id="code" type="text" />
          </StyledFormGroup>
        ) : null}
        <div>
          <Button variant="primary" type="submit">
            {isLoading ? <Spinner css={{ marginLeft: 5 }} /> : null}
            {authState === 'signIn' ? 'Sign in' : null}
            {authState === 'signUp' ? 'Sign up' : null}
            {authState === 'confirm' ? 'confirm sign up' : null}
          </Button>
        </div>
        {isError ? <ErrorMessage error={error} /> : null}
      </StyledForm>
      <Button variant="secondary" onClick={() => toggleAuthState()}>
        {authState === 'signIn' ? 'Sign up for an account' : null}
        {authState === 'signUp' ? 'Sign into an existing account' : null}
      </Button>
    </Layout>
  );
}

export { UnauthenticatedApp };
