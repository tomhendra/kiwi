import { render, screen } from '@testing-library/react';
import App from './app';

test('renders header', () => {
  render(<App />);
  const headerElement = screen.getByText(/header/i);
  expect(headerElement).toBeInTheDocument();
});
