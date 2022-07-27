import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders the landing page', async () => {
  render(<App />);
  //test if the button is rendered
  expect(screen.getByRole("button", { name: "Search" }));
  // //test empty fields button
  userEvent.click(screen.getByText('Search'));
  expect(screen.queryByRole('alert', {name: ' Form has errors'}))
});

