import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Click Me button', () => {
  const { getByText } = render(<App />);
  const buttonElement = getByText(/Click Me/i);
  expect(buttonElement).toBeInTheDocument();
});
