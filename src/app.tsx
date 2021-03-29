/** @jsxImportSource @emotion/react */
import { Layout, Button } from 'components';
import {
  ModalProvider,
  ModalOpenButton,
  ModalContents,
  LoginForm,
} from 'containers';
import { Auth } from 'core/types/user';
import { Dashboard } from 'screens';

function App() {
  function login(formData: Auth) {
    console.log('login', formData);
  }

  function register(formData: Auth) {
    console.log('register', formData);
  }

  return (
    <Layout>
      <h1>Búho</h1>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gridGap: '0.75rem',
          maxWidth: '20rem',
        }}
      >
        <ModalProvider>
          <ModalOpenButton>
            <Button variant="primary">Login</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Login form" title="Login">
            <LoginForm
              onSubmit={login}
              submitButton={<Button variant="primary">Login</Button>}
            />
          </ModalContents>
        </ModalProvider>
        <ModalProvider>
          <ModalOpenButton>
            <Button variant="secondary">Register</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Registration form" title="Register">
            <LoginForm
              onSubmit={register}
              submitButton={<Button variant="secondary">Register</Button>}
            />
          </ModalContents>
        </ModalProvider>
      </div>
      <Dashboard />
    </Layout>
  );
}

export default App;
