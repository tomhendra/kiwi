import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';

test('renders button', () => {
  const { getByText } = render(<App />);
  const buttonElement = getByText(/Welcome/i);
  expect(buttonElement).toBeInTheDocument();
});
