<div align=center>
<img alt="Tom Hendra logo" src="https://res.cloudinary.com/tomhendra/image/upload/v1567091669/tomhendra-logo/tomhendra-logo-round-1024.png" width="100" />
<h1>Buho</h1>
<p>Bug tracking software</p>
</div>

A desktop Progressive Web App for tracking bugs in software.

## Tech stack

- **Frontend:** React, TypeScript, Theme UI.
- **Testing:** Jest, React Testing Library.
- **Backend:** Node JS, Express.
- **Database:** PostgreSQL, Redis.
- **Security:** Auth0, Snyk.
- **Deployment:** AWS, Docker, Circle CI.

## Notes on project setup for upcoming blog post(s)!

CRA install with TypeScript.

```sh
npx create-react-app buho-app --template typescript
```

Install Theme UI & types from Definitely Typed.

```sh
cd buho-app && yarn add theme-ui @types/theme-ui
```

Install Tailwind preset.

```sh
yarn add @theme-ui/preset-tailwind
```

Create `theme.js` in `src`.

```js
import theme from '@theme-ui/preset-tailwind';

export default {
  ...theme,
  buttons: {
    primary: {
      color: 'background',
      bg: 'primary',
      '&:hover': {
        bg: 'primaryHover',
      },
    },
    secondary: {
      color: 'background',
      bg: 'secondary',
    },
  },
};
```

Open `index.tsx` and edit.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
import { App } from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
```

Open `App.tsx` and edit.

```js
import * as React from 'react';
import { Box, Button } from 'theme-ui';

export function App(): JSX.Element {
  return (
    <Box p={4} color="white" bg="primary">
      <Button variant="primary" mr={2}>
        Beep
      </Button>
      <Button variant="secondary" mr={2}>
        Boop
      </Button>
    </Box>
  );
}
```

Open `App.test.tsx` and edit.

```js
import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';

test('renders Beep button', () => {
  const { getByText } = render(<App />);
  const buttonElement = getByText(/Beep/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders Boop button', () => {
  const { getByText } = render(<App />);
  const buttonElement = getByText(/Boop/i);
  expect(buttonElement).toBeInTheDocument();
});
```

Delete `index.css`, `App.css` & `logo.svg` files.

Run test.

```sh
yarn test
```

Start up dev server.

```sh
yarn start
```
