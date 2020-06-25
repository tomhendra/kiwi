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
