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

CRA setup with TypeScript & install Ant Design package.

```sh
npx create-react-app buho-app --template typescript
```

install Ant Design.

```sh
cd buho-app && yarn add antd
```

To enable customization of theme, it's necessary to modify less variables via loader like less-loader. This can be achieved with `craco-less`.

```sh
yarn add @craco/craco craco-less
```

Modify the scripts in package.json.

```json
"start": "craco start",
"build": "craco build",
"test": "craco test",
```

Then create a `craco.config.js` file at root directory of the project for further overriding.

```sh
touch craco.config.js
```

```js
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#5E81AC' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
```

Change the extension of `App.css` to `App.less` and replace file contents:

```css
@import '~antd/dist/antd.less';
```

Replace App.tsx contents.

```js
import React, { FC } from 'react';
import { Button } from 'antd';
import './App.less';

const App: FC = () => (
  <div className="App">
    <Button type="primary">Click me</Button>
  </div>
);

export default App;
```

Replace App.test.tsx contents.

```js
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Click Me button', () => {
  const { getByText } = render(<App />);
  const buttonElement = getByText(/Click Me/i);
  expect(buttonElement).toBeInTheDocument();
});
```

Delete `index.css` and `logo.svg` files.

Remove `import './index.css';` from `index.tsx`

Run test.

```sh
yarn test
```

Start up dev server.

```sh
yarn start
```
