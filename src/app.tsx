/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { Layout, Button, StyledInput } from 'components';
import { Auth, Hub } from 'aws-amplify';

interface FormState {
  username: string;
  password: string;
  email: string;
  authCode: string;
  formType: 'signUp' | 'confirmSignUp' | 'signIn' | 'signedIn';
}

const initialFormState: FormState = {
  username: '',
  password: '',
  email: '',
  authCode: '',
  formType: 'signUp',
};

function App() {
  const [formState, updateFormState] = React.useState(initialFormState);
  const [user, updateUser] = React.useState({ username: '' });

  React.useEffect(() => {
    checkUser();
    setAuthListener();
  }, []);

  async function checkUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      updateUser(user);
      updateFormState(() => ({ ...formState, formType: 'signedIn' }));
    } catch (error) {
      console.log(error);
    }
  }

  async function setAuthListener() {
    Hub.listen('auth', data => {
      switch (data.payload.event) {
        case 'signOut':
          console.log({ data });
          updateFormState(() => ({ ...formState, formType: 'signUp' }));
          break;
        default:
          break;
      }
    });
  }

  function handleChange(event: React.ChangeEvent) {
    event.persist();
    const { name, value } = event.target as HTMLFormElement;
    updateFormState(() => ({ ...formState, [name]: value }));
  }

  async function signUp() {
    const { username, email, password } = formState;
    await Auth.signUp({ username, password, attributes: { email } });
    updateFormState(() => ({ ...formState, formType: 'confirmSignUp' }));
  }

  async function confirmSignUp() {
    const { username, authCode } = formState;
    await Auth.confirmSignUp(username, authCode);
    updateFormState(() => ({ ...formState, formType: 'signIn' }));
  }

  async function signIn() {
    const { username, password } = formState;
    await Auth.signIn(username, password);
    updateFormState(() => ({ ...formState, formType: 'signedIn' }));
  }

  async function signOut() {
    await Auth.signOut();
  }

  const { formType } = formState;
  console.log({ formState });
  console.log({ user });

  return (
    <Layout>
      <h1>Búho</h1>
      <div
        css={{
          background: 'white',
          display: 'flex',
          maxWidth: '20rem',
          padding: '2rem',
        }}
      >
        {formType === 'signUp' && (
          <div>
            <StyledInput
              name="username"
              type="text"
              onChange={handleChange}
              placeholder="Username"
            />
            <StyledInput
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Password"
            />
            <StyledInput
              name="email"
              type="email"
              onChange={handleChange}
              placeholder="Email"
            />
            <div css={{ display: 'flex' }}>
              <Button variant="primary" onClick={signUp}>
                Sign Up
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  updateFormState(() => ({
                    ...formState,
                    formType: 'signIn',
                  }))
                }
              >
                Sign In
              </Button>
            </div>
          </div>
        )}
        {formType === 'confirmSignUp' && (
          <div>
            <StyledInput
              name="authCode"
              type="text"
              onChange={handleChange}
              placeholder="Confirmation code"
            />
            <Button variant="primary" onClick={confirmSignUp}>
              Confirm Sign Up
            </Button>
          </div>
        )}
        {formType === 'signIn' && (
          <div>
            <StyledInput
              name="username"
              type="text"
              onChange={handleChange}
              placeholder="Username"
            />
            <StyledInput
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Password"
            />
            <Button variant="secondary" onClick={signIn}>
              Sign In
            </Button>
          </div>
        )}
        {formType === 'signedIn' && (
          <div>
            <p>Hello & welcome {user.username}!</p>
            <Button variant="secondary" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default App;
