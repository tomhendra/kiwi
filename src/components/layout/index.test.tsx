import { render, screen } from '@testing-library/react';
import { Layout } from '.';

test('renders layout', () => {
  render(<Layout />);
  const headerElement = screen.getByText(/header/i);
  expect(headerElement).toBeInTheDocument();
});
