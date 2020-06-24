<div align=center>
<img alt="Tom Hendra logo" src="https://res.cloudinary.com/tomhendra/image/upload/v1567091669/tomhendra-logo/tomhendra-logo-round-1024.png" width="100" />
<h1>Buho</h1>
<p>Bug tracking software</p>
</div>

A desktop Progressive Web App for tracking bugs in software.

## Tech stack

- **Frontend:** React, TypeScript, Emotion.
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

Install Chakra UI and its peer dependencies.

```sh
cd buho-app && yarn add @chakra-ui/core @chakra-ui/theme @emotion/core @emotion/styled emotion-theming
```

Open `index.tsx` and edit.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { ChakraProvider, CSSReset } from '@chakra-ui/core';
import theme from '@chakra-ui/theme';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <CSSReset />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
```

Open `App.tsx` and edit.

```js
import * as React from 'react';
import logo from './logo.svg';
import {
  Button,
  chakra,
  Badge,
  Checkbox,
  Radio,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/core';

export function App() {
  return (
    <div>
      <chakra.header display="flex" flexDir="column" alignItems="center">
        <chakra.img src={logo} alt="logo" boxSize="200px" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton>Accordion 1</AccordionButton>
            <AccordionPanel>Welcome home</AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Button colorScheme="blue" size="sm">
          Welcome
        </Button>
        <chakra.a
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </chakra.a>
        <Checkbox>Welcome</Checkbox>
        <Radio>Welcome</Radio>
        <Badge colorScheme="red" variant="outline">
          Welcome home
        </Badge>
      </chakra.header>
    </div>
  );
}
```

Replace App.test.tsx contents.

```js
test('renders button', () => {
  const { getByText } = render(<App />);
  const buttonElement = getByText(/Welcome/i);
  expect(buttonElement).toBeInTheDocument();
});
```

Delete `index.css` & `App.css` files.

Run test.

```sh
yarn test
```

Start up dev server.

```sh
yarn start
```
